import type { Metadata } from 'next'
import { CinematicFx } from '@/components/cinematic-fx'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SiteFooter } from '@/components/site-footer'
import { JoinRedirect } from './JoinRedirect'

function inviteCode(ref: string) {
  return ref.replace(/-/g, '').slice(0, 8).toUpperCase()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ref: string }>
}): Promise<Metadata> {
  const { ref } = await params

  return {
    title: "You're Invited · APEX",
    description:
      "You've been invited to APEX — the GCC's most exclusive motor community. By invitation. By passion. By machine.",
    openGraph: {
      title: "You're Invited · APEX",
      description:
        "You've been invited to APEX — the GCC's most exclusive motor community.",
      url: `https://getapexmena.com/join/${ref}`,
      siteName: 'APEX',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "You're Invited · APEX",
      description:
        "You've been invited to APEX — the GCC's most exclusive motor community.",
    },
    other: {
      'apple-itunes-app': `app-id=6773114294, app-argument=apex://join/${ref}`,
    },
  }
}

export default async function JoinInvitePage({
  params,
}: {
  params: Promise<{ ref: string }>
}) {
  const { ref } = await params
  const code = inviteCode(ref)

  return (
    <main className="relative min-h-screen bg-carbon font-sans text-white">
      <CinematicFx />
      <ScrollReveal />

      <section className="flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-24 text-center">
        <span className="reveal text-xl font-extrabold tracking-[0.04em] text-white md:text-2xl">
          APEX
        </span>

        <p className="reveal mt-10 text-[11px] font-semibold uppercase tracking-[0.5em] text-teal">
          You&apos;ve been invited
        </p>

        <h1 className="reveal mt-6 text-balance font-extrabold leading-[0.95] text-white [font-size:clamp(2.75rem,9vw,5.5rem)]">
          By
          <br />
          <span className="text-gold">invitation.</span>
        </h1>

        <p className="reveal mt-8 max-w-md text-[15px] leading-relaxed text-white/60">
          The GCC&apos;s most exclusive motor community. Supercars, superbikes,
          karting and offroad — across the Gulf.
        </p>

        <JoinRedirect referrerId={ref} code={code} />
      </section>

      <SiteFooter />
    </main>
  )
}
