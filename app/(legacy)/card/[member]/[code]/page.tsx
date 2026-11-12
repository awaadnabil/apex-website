import type { Metadata } from 'next'
import { cardRef } from '@/lib/card-scan'
import { CardScan } from './CardScan'
import { SiteFooter } from '@/components/site-footer'

// A live, per-rider code: never indexed, never previewed, never cached.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'APEX Card check',
  description: 'Checks an APEX Card at a partner venue.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

/**
 * getapexmena.com/card/<rider>/<code> — the APEX Card QR opened by a phone WITHOUT the app
 * (with the app, the universal link opens it in-app instead). Everything happens in the browser
 * (CardScan), so a link preview or crawler fetching this HTML never records a scan.
 */
export default async function ApexCardScanPage({
  params,
}: {
  params: Promise<{ member: string; code: string }>
}) {
  const { member, code } = await params
  const ref = cardRef(member, code)

  return (
    <main className="min-h-screen bg-carbon font-sans text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-5 px-5 pb-16 pt-10">
        <div className="flex items-center justify-between">
          <span className="text-lg font-extrabold tracking-[0.04em]">APEX</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50">Card check</span>
        </div>
        <CardScan member={ref?.member ?? null} code={ref?.code ?? null} />
      </section>
      <SiteFooter />
    </main>
  )
}
