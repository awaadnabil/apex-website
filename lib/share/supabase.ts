// The share pages' only data source: two anon-callable RPCs (supabase/sql/2026-11-13_public_share_rpcs.sql)
// that return the public fields of one partner or one club. The publishable key is the same one that ships
// inside the mobile app; the website never holds the service role key.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://lsstkxtzttvdwetwehwm.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'sb_publishable_lqKDzYag04rFB2UXyKLo5Q_ccYIP1_T'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function isUuid(value: string | null | undefined): value is string {
  return typeof value === 'string' && UUID_RE.test(value)
}

export type PublicPartner = {
  id: string
  name: string
  partner_type: 'dealer' | 'ride_stop' | string
  ride_stop_subtype: string | null
  city: string
  verified: boolean
  logo_url: string | null
  cover_url: string | null
  description: string | null
  community_perk: string | null
  member_perk: string | null
  instagram_url: string | null
  whatsapp: string | null
  website_url: string | null
  address: string | null
  latitude: number | null
  longitude: number | null
  google_place_id: string | null
}

export type PublicClubRide = {
  id: string
  title: string
  date_time: string
  meeting_point: string | null
  destination_name: string | null
  route_distance_km: number | null
  count: number | null
  max_participants: number | null
  club_members_only: boolean
}

export type PublicClub = {
  id: string
  name: string
  description: string | null
  cover_image_url: string | null
  tribe: string | null
  join_type: string | null
  member_count: number
  max_members: number | null
  is_verified: boolean
  upcoming_rides: PublicClubRide[]
}

async function rpc<T>(fn: string, args: Record<string, unknown>): Promise<T | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        // one row or nothing, as an object rather than a one-element array
        Accept: 'application/vnd.pgrst.object+json',
      },
      body: JSON.stringify(args),
      // a partner edits their perk in the app and sees it on the shared link within a minute
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

/** One active partner's public fields, or null for an unknown, suspended or malformed id. */
export async function fetchPublicPartner(id: string): Promise<PublicPartner | null> {
  if (!isUuid(id)) return null
  const row = await rpc<PublicPartner>('get_public_partner', { p_id: id.toLowerCase() })
  return row && row.id ? row : null
}

/** One active club's public fields plus its next five rides, or null. */
export async function fetchPublicClub(id: string): Promise<PublicClub | null> {
  if (!isUuid(id)) return null
  const row = await rpc<PublicClub>('get_public_club', { p_id: id.toLowerCase() })
  if (!row || !row.id) return null
  return { ...row, upcoming_rides: Array.isArray(row.upcoming_rides) ? row.upcoming_rides : [] }
}
