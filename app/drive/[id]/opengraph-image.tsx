import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'A drive on APEX'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const SUPABASE_URL = 'https://lsstkxtzttvdwetwehwm.supabase.co'
// Publishable key — the same one that ships inside the mobile app bundle.
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'sb_publishable_lqKDzYag04rFB2UXyKLo5Q_ccYIP1_T'

type Drive = {
  title?: string | null
  date_time?: string | null
  meeting_point?: string | null
  destination_name?: string | null
  route_distance_km?: number | null
  count?: number | null
  max_participants?: number | null
  region?: string | null
}

async function getDrive(id: string): Promise<Drive | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/drives?id=eq.${encodeURIComponent(id)}&select=*`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        next: { revalidate: 60 },
      },
    )
    if (!res.ok) return null
    const rows = (await res.json()) as Drive[]
    return rows?.[0] ?? null
  } catch {
    return null
  }
}

function formatWhen(iso?: string | null) {
  if (!iso) return null
  try {
    const d = new Date(iso)
    const date = d.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      timeZone: 'Asia/Dubai',
    })
    const time = d.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Dubai',
    })
    return `${date} · ${time}`
  } catch {
    return null
  }
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const drive = await getDrive(id)

  const title = drive?.title?.trim() || 'A drive on APEX'
  const when = formatWhen(drive?.date_time)
  const distance = drive?.route_distance_km
    ? `${Math.round(drive.route_distance_km)} km`
    : null
  const where = drive?.meeting_point?.trim() || drive?.destination_name?.trim() || null

  const riding = drive?.count ?? 0
  const capacity = drive?.max_participants ?? 0
  const remaining = capacity > 0 ? Math.max(capacity - riding, 0) : null
  const fill = capacity > 0 ? Math.min(riding / capacity, 1) : 0

  const meta = [when, distance].filter(Boolean).join(' · ')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#080808',
          padding: '64px 72px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 10,
            color: '#FFFFFF',
          }}
        >
          APEX
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 84,
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>

          {meta ? (
            <div
              style={{
                display: 'flex',
                marginTop: 22,
                fontSize: 34,
                color: '#9AA6B0',
              }}
            >
              {meta}
            </div>
          ) : null}

          {where ? (
            <div
              style={{
                display: 'flex',
                marginTop: 10,
                fontSize: 28,
                color: '#6E6E6E',
              }}
            >
              {where}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 4,
              color: '#8A9BA8',
            }}
          >
            {remaining !== null
              ? `${riding} RIDING · ${remaining} PLACES LEFT`
              : 'THE GCC’S MOST EXCLUSIVE MOTOR COMMUNITY'}
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 26,
              width: '100%',
              height: 6,
              background: '#1C1C1C',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: `${Math.max(fill * 100, 2)}%`,
                height: 6,
                background: '#00C8C8',
              }}
            />
          </div>
        </div>
      </div>
    ),
    size,
  )
}
