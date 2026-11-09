// enquiry-notify — the website's only write path for partner enquiries and concierge requests.
//
// Called server-to-server by getapexmena.com (a Next.js server action), never by a browser.
// 1. Verifies the shared secret header (ENQUIRY_SHARED_SECRET).
// 2. Re-validates every field (the website validates too, but this is the trust boundary).
// 3. Verifies the Cloudflare Turnstile token with TURNSTILE_SECRET_KEY. Tokens are single-use,
//    so the website never verifies it itself.
// 4. Rate-limits per hashed client IP.
// 5. Inserts with the service role (the tables have RLS on and no policies).
// 6. Sends an Expo push to ENQUIRY_NOTIFY_USER_ID, the same payload shape as admin-direct-push.
//    A failed push never loses the enquiry: the row keeps notify_error for follow-up.
//
// Deploy with --no-verify-jwt: the website authenticates with the shared secret, and the
// project's publishable key (sb_publishable_…) is not a JWT the gateway could verify.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RATE_WINDOW_MINUTES = 10;
const RATE_MAX_PER_WINDOW = 5;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PARTNER_TYPES = new Set(['dealer', 'shop', 'ride_stop']);
const CONCIERGE_TOPICS = new Set([
  'Membership',
  'Billing',
  'Events & Drives',
  'App & Access',
  'Something else',
]);

type FieldErrors = Record<string, string>;

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.normalize('NFC').trim().slice(0, max) : '';
}

/** Constant-time string comparison so the secret can't be probed by timing. */
function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  const n = Math.max(x.length, y.length);
  for (let i = 0; i < n; i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

async function sha256(input: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

async function verifyTurnstile(secret: string, token: string, ip: string | null) {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  form.append('idempotency_key', crypto.randomUUID());
  const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body: form });
  if (!res.ok) return { success: false, codes: [`http-${res.status}`] };
  const out = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
  return { success: out.success === true, codes: out['error-codes'] ?? [] };
}

function validatePartner(b: Record<string, unknown>) {
  const row = {
    business_name: str(b.business_name, 160),
    contact_name: str(b.contact_name, 120),
    partner_type: str(b.partner_type, 20),
    city: str(b.city, 80),
    email: str(b.email, 254).toLowerCase(),
    phone: str(b.phone, 32) || null,
  };
  const errors: FieldErrors = {};
  if (row.business_name.length < 2) errors.business_name = 'required';
  if (row.contact_name.length < 2) errors.contact_name = 'required';
  if (!PARTNER_TYPES.has(row.partner_type)) errors.partner_type = 'required';
  if (row.city.length < 2) errors.city = 'required';
  if (!EMAIL_RE.test(row.email)) errors.email = 'invalid';
  if (row.phone && !/^[+0-9 ()-]{5,32}$/.test(row.phone)) errors.phone = 'invalid';
  return { row, errors };
}

function validateConcierge(b: Record<string, unknown>) {
  const row = {
    name: str(b.name, 120),
    email: str(b.email, 254).toLowerCase(),
    topic: str(b.topic, 60),
    message: str(b.message, 4000),
  };
  const errors: FieldErrors = {};
  if (row.name.length < 2) errors.name = 'required';
  if (!EMAIL_RE.test(row.email)) errors.email = 'invalid';
  if (!CONCIERGE_TOPICS.has(row.topic)) errors.topic = 'required';
  if (row.message.length < 12) errors.message = 'short';
  return { row, errors };
}

const PARTNER_LABEL: Record<string, string> = { dealer: 'Dealer', shop: 'Shop', ride_stop: 'Ride Stop' };

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' });

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const sharedSecret = Deno.env.get('ENQUIRY_SHARED_SECRET');
  const turnstileSecret = Deno.env.get('TURNSTILE_SECRET_KEY');
  const notifyUserId = Deno.env.get('ENQUIRY_NOTIFY_USER_ID');
  const missing = [
    !supabaseUrl && 'SUPABASE_URL',
    !serviceKey && 'SUPABASE_SERVICE_ROLE_KEY',
    !sharedSecret && 'ENQUIRY_SHARED_SECRET',
    !turnstileSecret && 'TURNSTILE_SECRET_KEY',
    !notifyUserId && 'ENQUIRY_NOTIFY_USER_ID',
  ].filter(Boolean);
  if (missing.length) {
    console.error('[enquiry-notify] missing env:', missing.join(', '));
    return json(503, { error: 'misconfigured' });
  }

  // 1. Shared secret
  const given = req.headers.get('x-enquiry-secret') ?? '';
  if (!given || !safeEqual(given, sharedSecret!)) return json(401, { error: 'unauthorized' });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: 'bad_json' });
  }

  const kind = body.kind;
  if (kind !== 'partner' && kind !== 'concierge') return json(400, { error: 'bad_kind' });
  const locale = body.locale === 'ar' ? 'ar' : 'en';

  // 2. Fields
  const { row, errors } = kind === 'partner' ? validatePartner(body) : validateConcierge(body);
  if (Object.keys(errors).length) return json(422, { error: 'invalid', fields: errors });

  // 3. Turnstile (the website forwards the visitor's IP in x-client-ip)
  const clientIp = (req.headers.get('x-client-ip') ?? '').split(',')[0].trim() || null;
  const token = str(body.turnstile_token, 2048);
  if (!token) return json(400, { error: 'turnstile_missing' });
  const ts = await verifyTurnstile(turnstileSecret!, token, clientIp);
  if (!ts.success) {
    console.warn('[enquiry-notify] turnstile rejected:', ts.codes.join(','));
    return json(403, { error: 'turnstile_failed' });
  }

  const admin = createClient(supabaseUrl!, serviceKey!, { auth: { persistSession: false } });
  const table = kind === 'partner' ? 'partner_enquiries' : 'concierge_requests';

  // 4. Rate limit per hashed IP (the raw IP is never stored)
  const ipHash = clientIp ? await sha256(`${sharedSecret}:${clientIp}`) : null;
  if (ipHash) {
    const since = new Date(Date.now() - RATE_WINDOW_MINUTES * 60_000).toISOString();
    const { count, error: countErr } = await admin
      .from(table)
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', since);
    if (countErr) console.error('[enquiry-notify] rate check failed:', countErr.message);
    else if ((count ?? 0) >= RATE_MAX_PER_WINDOW) return json(429, { error: 'rate_limited' });
  }

  // 5. Insert
  const { data: inserted, error: insertErr } = await admin
    .from(table)
    .insert({ ...row, locale, ip_hash: ipHash })
    .select('id')
    .single();
  if (insertErr || !inserted) {
    console.error('[enquiry-notify] insert failed:', insertErr?.message);
    return json(500, { error: 'insert_failed' });
  }

  // 6. Push. The enquiry is already safe, so a push failure is recorded, not thrown.
  let notifyError: string | null = null;
  try {
    const { data: target, error: targetErr } = await admin
      .from('users')
      .select('expo_push_token')
      .eq('id', notifyUserId!)
      .maybeSingle();
    if (targetErr) throw new Error(`recipient lookup: ${targetErr.message}`);
    const pushToken = target?.expo_push_token;
    if (!pushToken) throw new Error('recipient has no expo_push_token');

    const title =
      kind === 'partner'
        ? `New partner enquiry · ${PARTNER_LABEL[(row as { partner_type: string }).partner_type]}`
        : `New concierge request · ${(row as { topic: string }).topic}`;
    const text =
      kind === 'partner'
        ? `${(row as { business_name: string }).business_name}, ${(row as { city: string }).city}. ${(row as { contact_name: string }).contact_name} · ${(row as { email: string }).email}${(row as { phone: string | null }).phone ? ` · ${(row as { phone: string }).phone}` : ''}`
        : `${(row as { name: string }).name} · ${(row as { email: string }).email}: ${(row as { message: string }).message.slice(0, 140)}`;

    const expoRes = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify([
        {
          to: pushToken,
          sound: 'default',
          title,
          body: text,
          data: { type: kind === 'partner' ? 'partner_enquiry' : 'concierge_request', id: inserted.id },
        },
      ]),
    });
    const expoBody = await expoRes.json().catch(() => null) as
      | { data?: Array<{ status: string; message?: string }> }
      | null;
    if (!expoRes.ok) throw new Error(`expo http ${expoRes.status}`);
    const ticket = expoBody?.data?.[0];
    if (ticket?.status === 'error') throw new Error(`expo ticket: ${ticket.message ?? 'error'}`);
  } catch (e) {
    notifyError = e instanceof Error ? e.message : String(e);
    console.error('[enquiry-notify] push failed:', notifyError);
  }

  await admin
    .from(table)
    .update(notifyError ? { notify_error: notifyError.slice(0, 500) } : { notified_at: new Date().toISOString() })
    .eq('id', inserted.id);

  return json(200, { ok: true, id: inserted.id, notified: notifyError === null });
});
