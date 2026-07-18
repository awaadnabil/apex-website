import type { Metadata } from 'next'
import { CinematicFx } from '@/components/cinematic-fx'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SiteFooter } from '@/components/site-footer'
import { ApexButton } from '@/components/apex-button'

const APP_STORE_URL = 'https://apps.apple.com/app/apex-mena/id6773114294'

export const metadata: Metadata = {
  title: "You're Invited · APEX",
  description:
    "You've been invited to join a drive on APEX — the GCC's most exclusive motor community.",
}

export default async function DriveInvitePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // The id only matters to the app's universal-link handler — if APEX is
  // installed, iOS intercepts this URL before this fallback page ever renders.
  await params

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

        <div className="reveal mt-14">
          <ApexButton href={APP_STORE_URL} variant="solid">
            Download APEX on iOS
          </ApexButton>
        </div>

        <p className="reveal mt-8 text-[11px] uppercase tracking-[0.3em] text-white/40">
          Already have APEX? The link will open automatically.
        </p>
      </section>

      <SiteFooter />
    </main>
  )
}
