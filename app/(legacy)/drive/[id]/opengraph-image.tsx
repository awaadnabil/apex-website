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
  start_name?: string | null
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
    return date
  } catch {
    return null
  }
}

function formatTime(iso?: string | null) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Dubai',
    })
  } catch {
    return null
  }
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const drive = await getDrive(id)

  const title = drive?.title?.trim() || 'A drive on APEX'
  const when = formatWhen(drive?.date_time)
  const rollTime = formatTime(drive?.date_time)
  const distance = drive?.route_distance_km
    ? `${Math.round(drive.route_distance_km)} km`
    : null
  const meetup = drive?.meeting_point?.trim() || drive?.start_name?.trim() || null
  const destination = drive?.destination_name?.trim() || null

  const riding = drive?.count ?? 0
  const capacity = drive?.max_participants ?? 0
  const remaining = capacity > 0 ? Math.max(capacity - riding, 0) : null
  const fill = capacity > 0 ? Math.min(riding / capacity, 1) : 0

  const facts: { label: string; value: string }[] = []
  if (meetup) facts.push({ label: 'MEET', value: meetup })
  if (rollTime) facts.push({ label: 'ROLL', value: rollTime })
  if (destination)
    facts.push({
      label: 'TO',
      value: distance ? `${destination} · ${distance}` : destination,
    })

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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 38,
              fontWeight: 800,
              letterSpacing: 12,
              color: '#FFFFFF',
            }}
          >
            APEX
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 8,
              width: 54,
              height: 3,
              background: '#00C8C8',
            }}
          />
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

          {when ? (
            <div
              style={{
                display: 'flex',
                marginTop: 20,
                fontSize: 32,
                color: '#9AA6B0',
              }}
            >
              {when}
            </div>
          ) : null}

          {facts.length > 0 ? (
            <div style={{ display: 'flex', marginTop: 34, gap: 56 }}>
              {facts.map((f) => (
                <div key={f.label} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      display: 'flex',
                      fontSize: 18,
                      fontWeight: 600,
                      letterSpacing: 4,
                      color: '#6E6E6E',
                    }}
                  >
                    {f.label}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      marginTop: 9,
                      fontSize: 27,
                      color: '#FFFFFF',
                    }}
                  >
                    {f.value}
                  </div>
                </div>
              ))}
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
