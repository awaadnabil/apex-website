import type { Metadata } from 'next'
import { CinematicFx } from '@/components/cinematic-fx'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SiteFooter } from '@/components/site-footer'
import { DriveRedirect } from './DriveRedirect'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  return {
    title: "You're Invited · APEX",
    description:
      "You've been invited to join a drive on APEX — the GCC's most exclusive motor community.",
    other: {
      'apple-itunes-app': `app-id=6773114294, app-argument=apex://drive/${id}`,
    },
  }
}

export default async function DriveInvitePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main className="relative min-h-screen bg-carbon font-sans text-white">
      <CinematicFx />
      <ScrollReveal />

      <section className="flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-24 text-center">
        <span className="reveal text-xl font-extrabold tracking-[0.04em] text-white md:text-2xl">
          APEX
        </span>

        <p className="reveal mt-10 text-[11px] font-semibold uppercase tracking-[0.5em] text-teal">
          You&apos;ve been invited to join a drive
        </p>

        <h1 className="reveal mt-6 text-balance font-extrabold leading-[0.95] text-white [font-size:clamp(2.75rem,9vw,5.5rem)]">
          You&apos;ve been
          <br />
          <span className="text-gold">invited.</span>
        </h1>

        <p className="reveal mt-8 max-w-md text-[15px] leading-relaxed text-white/60">
          Join this drive on APEX — the GCC&apos;s most exclusive motor community.
        </p>

        <DriveRedirect driveId={id} />
      </section>

      <SiteFooter />
    </main>
  )
}
