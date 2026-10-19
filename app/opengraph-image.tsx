import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

export const alt = 'APEX — the GCC car and motorcycle community'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#080808',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SITE.heroImage}
          alt=""
          width={1200}
          height={630}
          style={{ position: 'absolute', top: 0, left: 0, width: 1200, height: 630, objectFit: 'cover', opacity: 0.55 }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '64px 72px',
            backgroundImage: 'linear-gradient(180deg, rgba(8,8,8,0) 30%, rgba(8,8,8,0.92) 100%)',
          }}
        >
          <div style={{ fontSize: 150, fontWeight: 800, color: '#fff', letterSpacing: 6, lineHeight: 1 }}>
            APEX
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 30,
              color: '#00c8c8',
              letterSpacing: 8,
              textTransform: 'uppercase',
            }}
          >
            The GCC motor community
          </div>
          <div style={{ marginTop: 10, fontSize: 24, color: 'rgba(255,255,255,0.7)' }}>
            Supercars · Superbikes · Karting · Offroad — iPhone & Android
          </div>
        </div>
      </div>
    ),
    size,
  )
}
