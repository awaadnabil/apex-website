// POST /api/enquiry: the website's single write path for the partner and concierge forms.
// It validates, drops obvious bots (honeypot, sub-3-second fills), then forwards to the Supabase
// edge function `enquiry-notify` with the shared secret. The function verifies Turnstile, inserts
// with the service role and pushes to the owner. Vercel never holds the service role key.
import { NextResponse, type NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://lsstkxtzttvdwetwehwm.supabase.co'
const FUNCTION_URL = process.env.ENQUIRY_FUNCTION_URL ?? `${SUPABASE_URL}/functions/v1/enquiry-notify`
const SECRET = process.env.ENQUIRY_SHARED_SECRET ?? ''
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const MIN_FILL_MS = 3000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PARTNER_TYPES = new Set(['dealer', 'shop', 'ride_stop'])
const TOPICS = new Set(['Membership', 'Billing', 'Events & Drives', 'App & Access', 'Something else'])

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.normalize('NFC').trim().slice(0, max) : '')
const json = (status: number, body: Record<string, unknown>) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json(400, { error: 'bad_json' })
  }

  const kind = body.kind
  if (kind !== 'partner' && kind !== 'concierge') return json(400, { error: 'bad_kind' })
  const locale = body.locale === 'ar' ? 'ar' : 'en'

  // Bots: a filled honeypot or a form sent faster than a person can fill it. They get a plain 200 so
  // they learn nothing; no row is written and no push is sent.
  const elapsed = Number(body.elapsed_ms)
  if (str(body.website, 200) || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return json(200, { ok: true })
  }

  const fields: Record<string, string> = {}
  let payload: Record<string, unknown>
  if (kind === 'partner') {
    payload = {
      business_name: str(body.business_name, 160),
      contact_name: str(body.contact_name, 120),
      partner_type: str(body.partner_type, 20),
      city: str(body.city, 80),
      email: str(body.email, 254),
      phone: str(body.phone, 32),
    }
    if ((payload.business_name as string).length < 2) fields.business_name = 'required'
    if ((payload.contact_name as string).length < 2) fields.contact_name = 'required'
    if (!PARTNER_TYPES.has(payload.partner_type as string)) fields.partner_type = 'required'
    if ((payload.city as string).length < 2) fields.city = 'required'
    if (!EMAIL_RE.test(payload.email as string)) fields.email = 'invalid'
    if (payload.phone && !/^[+0-9 ()-]{5,32}$/.test(payload.phone as string)) fields.phone = 'invalid'
  } else {
    payload = {
      name: str(body.name, 120),
      email: str(body.email, 254),
      topic: str(body.topic, 60),
      message: str(body.message, 4000),
    }
    if ((payload.name as string).length < 2) fields.name = 'required'
    if (!EMAIL_RE.test(payload.email as string)) fields.email = 'invalid'
    if (!TOPICS.has(payload.topic as string)) fields.topic = 'required'
    if ((payload.message as string).length < 12) fields.message = 'short'
  }
  if (Object.keys(fields).length) return json(422, { error: 'invalid', fields })

  const token = str(body.turnstile_token, 2048)
  if (!token) return json(403, { error: 'turnstile_missing' })

  if (!SECRET) {
    console.error('[api/enquiry] ENQUIRY_SHARED_SECRET is not set')
    return json(503, { error: 'unavailable' })
  }

  const clientIp = (req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? '').split(',')[0].trim()
  try {
    const res = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-enquiry-secret': SECRET,
        ...(clientIp ? { 'x-client-ip': clientIp } : {}),
        ...(ANON_KEY ? { apikey: ANON_KEY } : {}),
      },
      body: JSON.stringify({ kind, locale, ...payload, turnstile_token: token }),
      signal: AbortSignal.timeout(15_000),
      cache: 'no-store',
    })
    const out = (await res.json().catch(() => ({}))) as Record<string, unknown>
    if (res.ok) return json(200, { ok: true, id: out.id ?? null })
    // Pass the function's meaning through; never its internals.
    if (res.status === 422) return json(422, { error: 'invalid', fields: (out.fields as Record<string, string>) ?? {} })
    if (res.status === 403) return json(403, { error: 'turnstile_failed' })
    if (res.status === 429) return json(429, { error: 'rate_limited' })
    console.error('[api/enquiry] function answered', res.status, out.error)
    return json(res.status === 401 || res.status === 503 ? 503 : 502, { error: 'unavailable' })
  } catch (e) {
    console.error('[api/enquiry] function unreachable:', e instanceof Error ? e.message : e)
    return json(503, { error: 'unavailable' })
  }
}
