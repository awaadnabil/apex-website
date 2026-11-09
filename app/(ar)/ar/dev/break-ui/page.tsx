// break-ui toggle (dev only: 404 in production). ?data=demo | worst | missing
import { notFound } from 'next/navigation'
import { Home } from '@/components/site/home'
import { COPY } from '@/lib/site/content'
import { WORST, MISSING_MEDIA } from '@/lib/site/worst-case'
import { kitViewport } from '@/lib/site/metadata'

export const dynamic = 'force-dynamic'
export const viewport = kitViewport
export const metadata = { robots: { index: false } }

export default async function BreakUi({ searchParams }: { searchParams: Promise<{ data?: string }> }) {
  if (process.env.NODE_ENV === 'production') notFound()
  const data = (await searchParams).data ?? 'demo'
  const c = data === 'worst' ? WORST.ar : COPY.ar
  const media = data === 'missing' ? MISSING_MEDIA : undefined
  return (
    <>
      <Home c={c} media={media} />
      <div style={{ position: 'fixed', insetInline: 0, bottom: 84, display: 'flex', justifyContent: 'center', zIndex: 99, pointerEvents: 'none' }}>
        <div style={{ display: 'flex', gap: 2, padding: 3, background: '#e5e7eb', borderRadius: 999, font: '13px system-ui', pointerEvents: 'auto' }}>
          {['demo', 'worst', 'missing'].map((k) => (
            <a key={k} href={`?data=${k}`} style={{ padding: '6px 12px', borderRadius: 999, color: '#111', background: k === data ? '#fff' : 'transparent' }}>
              {k === 'demo' ? 'Demo data' : k === 'worst' ? 'Worst case' : 'Missing photos'}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
