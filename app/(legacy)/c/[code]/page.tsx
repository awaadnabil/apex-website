import type { Metadata } from 'next'
import { CinematicFx } from '@/components/cinematic-fx'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SiteFooter } from '@/components/site-footer'
import { ClubInviteRedirect } from './ClubInviteRedirect'

const TITLE = "You're Invited · APEX"
const DESCRIPTION =
  "You've been invited to join a club on APEX — the GCC's most exclusive motor community."

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>
}): Promise<Metadata> {
  const { code } = await params
  return {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: `https://getapexmena.com/c/${code}`,
      siteName: 'APEX',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
    other: {
      'apple-itunes-app': `app-id=6773114294, app-argument=apex://c/${code}`,
    },
  }
}

export default async function ClubInvitePage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const pretty = decodeURIComponent(code).toUpperCase()

  return (
    <main className="relative min-h-screen bg-carbon font-sans text-white">
      <CinematicFx />
      <ScrollReveal />

      <section className="flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-24 text-center">
        <span className="reveal text-xl font-extrabold tracking-[0.04em] text-white md:text-2xl">
          APEX
        </span>

        <p className="reveal mt-10 text-[11px] font-semibold uppercase tracking-[0.5em] text-teal">
          You&apos;ve been invited to join a club
        </p>

        <h1 className="reveal mt-6 text-balance font-extrabold leading-[0.95] text-white [font-size:clamp(2.75rem,9vw,5.5rem)]">
          Ride with
          <br />
          <span className="text-teal">the pack.</span>
        </h1>

        <p className="reveal mt-8 max-w-md text-[15px] leading-relaxed text-white/60">
          Your invite pass
        </p>
        <p className="reveal mt-2 font-mono text-lg font-bold tracking-[0.12em] text-white">
          {pretty}
        </p>

        <ClubInviteRedirect code={code} />
      </section>

      <SiteFooter />
    </main>
  )
}
