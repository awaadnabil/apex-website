import type { Metadata } from 'next'
import { CinematicFx } from '@/components/cinematic-fx'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SiteFooter } from '@/components/site-footer'
import { ApexButton } from '@/components/apex-button'

const APP_STORE_URL = 'https://apps.apple.com/app/apex-mena/id6773114294'

/**
 * Point this at wherever the signed APK lives. EAS artifact URLs expire —
 * Supabase Storage or any static host is the durable choice.
 */
const APK_URL =
  process.env.NEXT_PUBLIC_APK_URL ?? 'https://getapexmena.com/apex.apk'

const ANDROID_STEPS = [
  {
    n: '01',
    title: 'Download the file',
    body: 'Chrome will warn you that this type of file can harm your device — that warning appears for every app installed outside the Play Store. Choose Download anyway.',
  },
  {
    n: '02',
    title: 'Allow the install',
    body: 'Open the downloaded file. Android will ask permission to install from this source. Allow it — you only do this once.',
  },
  {
    n: '03',
    title: 'Open APEX',
    body: 'Sign in with the same account you use anywhere else. Updates arrive automatically from here on.',
  },
]

export const metadata: Metadata = {
  title: 'Download APEX',
  description:
    'Install APEX on iPhone or Android — the GCC’s most exclusive motor community.',
  openGraph: {
    title: 'Download APEX',
    description: 'Install APEX on iPhone or Android.',
    url: 'https://getapexmena.com/download',
    siteName: 'APEX',
    type: 'website',
  },
}

export default function DownloadPage() {
  return (
    <main className="relative min-h-screen bg-carbon font-sans text-white">
      <CinematicFx />
      <ScrollReveal />

      <section className="mx-auto flex w-full max-w-2xl flex-col px-6 pb-24 pt-28">
        <span className="reveal text-xl font-extrabold tracking-[0.04em] text-white md:text-2xl">
          APEX
        </span>

        <p className="reveal mt-10 text-[11px] font-semibold uppercase tracking-[0.5em] text-teal">
          Download
        </p>

        <h1 className="reveal mt-6 text-balance font-extrabold leading-[0.95] text-white [font-size:clamp(2.25rem,7vw,4rem)]">
          Carry it
          <br />
          <span className="text-gold">with you.</span>
        </h1>

        <p className="reveal mt-8 max-w-md text-[15px] leading-relaxed text-white/60">
          Drives, routes, the live map and every member — on the machine in your
          pocket.
        </p>

        <div className="reveal mt-20 border-t border-white/10 pt-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
            iPhone
          </p>
          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/55">
            Available on the App Store. Membership is purchased here.
          </p>
          <div className="mt-8">
            <ApexButton href={APP_STORE_URL} variant="solid">
              Download on the App Store
            </ApexButton>
          </div>
        </div>

        <div className="reveal mt-20 border-t border-white/10 pt-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
            Android
          </p>
          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/55">
            APEX is not on the Play Store. Install it straight from here — the
            same app, delivered without a storefront in between.
          </p>
          <div className="mt-8">
            <ApexButton href={APK_URL} variant="white">
              Download for Android
            </ApexButton>
          </div>

          <div className="mt-14 flex flex-col gap-8">
            {ANDROID_STEPS.map((s) => (
              <div key={s.n} className="flex gap-6">
                <span className="font-mono text-[12px] tracking-[0.2em] text-white/30">
                  {s.n}
                </span>
                <div className="flex flex-col">
                  <h2 className="text-[16px] font-semibold text-white">{s.title}</h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/55">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-white/10 px-7 py-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
              Membership on Android
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/55">
              Join unlimited drives, follow the community and use the live map.
              For APEX MEMBER, speak to an organiser.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
