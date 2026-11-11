/**
 * APEX Card scan (app repo migration 110). The card QR is
 * https://getapexmena.com/card/<rider uuid>/<6-digit code>. A phone with APEX installed opens
 * it in the app (universal link). Any other phone lands here: the page asks Supabase
 * (scan_apex_card, callable signed out) whether the code is live, records the scan, and shows
 * the venue which perk to give. Runs in the browser only, so link previews and crawlers never
 * record a scan.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://lsstkxtzttvdwetwehwm.supabase.co'
// Publishable key — the same one that ships inside the mobile app bundle.
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'sb_publishable_lqKDzYag04rFB2UXyKLo5Q_ccYIP1_T'

export type CardRef = { member: string; code: string }

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const CODE = /^[0-9]{6}$/

export function cardRef(member: unknown, code: unknown): CardRef | null {
  const m = typeof member === 'string' ? member.trim() : ''
  const c = typeof code === 'string' ? code.trim() : ''
  return UUID.test(m) && CODE.test(c) ? { member: m.toLowerCase(), code: c } : null
}

export type ScanVenue = { id: string; name: string; city: string | null; logo_url: string | null; partner_type: string }

export type CardScanResult = {
  valid: boolean
  /** 'ok' | 'expired' | 'unknown' | 'malformed' | 'too_many' */
  reason: string
  scan_id?: string | null
  scanned_at?: string
  own_card?: boolean
  rider_name?: string | null
  tier?: 'community' | 'member'
  tier_label?: string
  staff_verified?: boolean
  recently_redeemed?: boolean
  dealer?: {
    id: string
    name: string
    partner_type: string
    perk: string | null
    community_perk: string | null
    member_perk: string | null
  } | null
}

async function rpc<T>(fn: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${fn} ${res.status}`)
  return (await res.json()) as T
}

export function scanApexCard(ref: CardRef, dealerId: string | null): Promise<CardScanResult> {
  return rpc<CardScanResult>('scan_apex_card', {
    p_member: ref.member,
    p_code: ref.code,
    p_dealer: dealerId,
    p_channel: 'web',
  })
}

export async function fetchScanVenues(): Promise<ScanVenue[]> {
  try {
    const data = await rpc<unknown>('card_scan_venues', {})
    return Array.isArray(data) ? (data as ScanVenue[]) : []
  } catch {
    return []
  }
}

/** What the venue reads first. Wording matches the app's /card screen. */
export function scanHeadline(r: CardScanResult | null): { ok: boolean; title: string; body: string | null } {
  if (!r) return { ok: false, title: 'Checking the card…', body: null }
  if (r.valid && r.own_card) {
    return { ok: true, title: 'This is your APEX Card', body: 'Show this QR at the counter. The venue scans it with any phone camera.' }
  }
  if (r.valid) return { ok: true, title: 'Valid APEX Card', body: null }
  switch (r.reason) {
    case 'expired':
      return { ok: false, title: 'Code expired', body: 'The code refreshes every minute. Ask the rider to open their APEX Card and scan again.' }
    case 'too_many':
      return { ok: false, title: 'Too many tries', body: 'This card was scanned with wrong codes too often. Wait a few minutes and scan the live card again.' }
    default:
      return { ok: false, title: 'Not an APEX Card', body: 'This QR is not a valid APEX Card. Ask the rider to open their card in the APEX app.' }
  }
}

/** The perk line for the result, or null when the venue isn't known yet. */
export function perkToGive(r: CardScanResult | null): string | null {
  const d = r?.valid && !r.own_card ? r.dealer : null
  if (!d) return null
  return d.perk ?? `No ${r?.tier === 'member' ? '' : 'rider '}perk set for ${d.name}`
}
