import type { Metadata } from 'next'
import { CinematicFx } from '@/components/cinematic-fx'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SiteFooter } from '@/components/site-footer'
import { ApexButton } from '@/components/apex-button'

/**
 * Point this at wherever the signed APK lives. An EAS artifact URL works, but
 * they expire — Supabase Storage or any static host is the durable choice.
 */
const APK_URL =
  process.env.NEXT_PUBLIC_APK_URL ?? 'https://getapexmena.com/apex.apk'

const STEPS = [
  {
    n: '01',
    title: 'Download the file',
    body: 'Tap the button below. Chrome will warn you that this type of file can harm your device — that warning appears for every app installed outside the Play Store. Choose Download anyway.',
  },
  {
    n: '02',
    title: 'Allow the install',
    body: 'Open the downloaded file. Android will ask permission to install from this source. Allow it — you only do this once.',
  },
  {
    n: '03',
    title: 'Open APEX',
    body: 'Install, then open. Sign in with the same account you use anywhere else. Updates arrive automatically from here on.',
  },
]

export const metadata: Metadata = {
  title: 'APEX for Android',
  description:
    'Install APEX on Android. Direct download — the GCC’s most exclusive motor community.',
  openGraph: {
    title: 'APEX for Android',
    description: 'Install APEX on Android. Direct download.',
    url: 'https://getapexmena.com/android',
    siteName: 'APEX',
    type: 'website',
  },
}

export default function AndroidPage() {
  return (
    <main className="relative min-h-screen bg-carbon font-sans text-white">
      <CinematicFx />
      <ScrollReveal />

      <section className="mx-auto flex w-full max-w-2xl flex-col px-6 pb-24 pt-28">
        <span className="reveal text-xl font-extrabold tracking-[0.04em] text-white md:text-2xl">
          APEX
        </span>

        <p className="reveal mt-10 text-[11px] font-semibold uppercase tracking-[0.5em] text-teal">
          Android
        </p>

        <h1 className="reveal mt-6 text-balance font-extrabold leading-[0.95] text-white [font-size:clamp(2.25rem,7vw,4rem)]">
          Install
          <br />
          <span className="text-gold">directly.</span>
        </h1>

        <p className="reveal mt-8 max-w-md text-[15px] leading-relaxed text-white/60">
          APEX is not on the Play Store. Members install it straight from here —
          the same app, delivered without a storefront in between.
        </p>

        <div className="reveal mt-12">
          <ApexButton href={APK_URL} variant="solid">
            Download APEX for Android
          </ApexButton>
        </div>

        <div className="mt-20 flex flex-col gap-10">
          {STEPS.map((s) => (
            <div key={s.n} className="reveal flex gap-6 border-t border-white/10 pt-8">
              <span className="font-mono text-[12px] tracking-[0.2em] text-white/30">
                {s.n}
              </span>
              <div className="flex flex-col">
                <h2 className="text-[17px] font-semibold text-white">{s.title}</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-white/55">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-16 border border-white/10 px-7 py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
            Membership
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-white/55">
            APEX MEMBER is purchased on iOS. On Android you can join unlimited
            drives, follow the community and use the live map — speak to an
            organiser about membership.
          </p>
        </div>

        <p className="reveal mt-14 text-[11px] uppercase tracking-[0.3em] text-white/30">
          On iPhone?{' '}
          <a
            href="https://apps.apple.com/app/apex-mena/id6773114294"
            className="text-teal transition-opacity duration-300 hover:opacity-70"
          >
            Download on the App Store
          </a>
        </p>
      </section>

      <SiteFooter />
    </main>
  )
}
