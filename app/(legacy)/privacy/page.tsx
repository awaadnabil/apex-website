import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/scroll-reveal'
import { CinematicFx } from '@/components/cinematic-fx'
import { SupportTopNav } from '@/components/support/support-topnav'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Privacy · APEX',
  description: 'How APEX collects, uses, and protects your information.',
}

const SECTIONS = [
  {
    no: '01',
    title: 'What we collect',
    body: 'Your account (name, e-mail, photo, membership tier), the rides you join or record, your garage, and anything you choose to add in Profile details: phone, contact e-mail, emirate, date of birth, Instagram handle, riding experience and style, market plans (buying or selling, timeline, budget band), interests, gear sizes and preferred contact. Every Profile details field is optional.',
  },
  {
    no: '02',
    title: 'How we use it',
    body: 'To run rides safely (ride leaders can reach riders), show you rides, Market items and deals near you and in your size, award XP and badges, process membership, and keep the community genuine. We never sell your personal data.',
  },
  {
    no: '03',
    title: 'Location during rides',
    body: 'When you go live or join a live ride, your position is shared only with riders who joined and checked in to that same ride, and only while it is running. Sharing stops when the ride ends and your live pin is removed.',
  },
  {
    no: '04',
    title: 'Partners: only with your consent',
    body: 'APEX partner dealers, shops and Ride Stops can see your profile only if you switch on "Share my profile with APEX partner dealers and shops so they can send me offers". It is off until you turn it on, and every change is recorded with the date and the policy version you agreed to. When you redeem a perk with your APEX Card, that partner sees your name, tier and the bill for that redemption.',
  },
  {
    no: '05',
    title: 'Your control',
    body: 'Turn partner sharing off any time in Profile → Privacy; partners stop seeing your profile immediately and the XP you earned stays. Delete your account in Profile → Settings, or e-mail us and we will delete your data within 30 days. You can also ask for a copy of your data or a correction.',
  },
  {
    no: '06',
    title: 'Retention & security',
    body: 'We keep your data while your account is active, plus any period required by UAE law. Data is encrypted in transit, protected by access rules in our database, and access is limited to authorized APEX staff and the service providers that run the app for us.',
  },
]

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-carbon font-sans text-white">
      <CinematicFx />
      <ScrollReveal />
      <SupportTopNav label="Privacy" />

      <section className="px-6 pb-32 pt-32 md:pb-48 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="reveal text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
            Legal
          </p>
          <h1 className="reveal mt-6 font-extrabold leading-none text-white [font-size:clamp(2.5rem,7vw,4.5rem)]">
            Privacy Policy
          </h1>
          <p className="reveal mt-8 max-w-xl text-[15px] leading-relaxed text-white/60">
            APEX is built on trust. This policy explains, in plain language, what
            we collect and how we protect it. Last updated 9 November 2026.
          </p>

          <div className="mt-20 flex flex-col">
            {SECTIONS.map((s, i) => (
              <div
                key={s.no}
                className={`reveal flex flex-col gap-4 border-b border-white/10 py-10 md:flex-row md:gap-12 ${
                  i === 0 ? 'border-t border-white/10' : ''
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="font-extrabold leading-none text-white/20 [font-size:clamp(1.5rem,3vw,2rem)] md:min-w-[80px]">
                  {s.no}
                </span>
                <div className="md:flex-1">
                  <h2 className="font-extrabold uppercase tracking-[0.15em] text-white [font-size:clamp(1.1rem,2.4vw,1.5rem)]">
                    {s.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="reveal mt-16 text-[13px] leading-relaxed text-white/50">
            Questions about your data? Reach the concierge at{' '}
            <a
              href="mailto:support@getapexmena.com"
              className="text-gold underline-offset-4 transition-colors duration-500 hover:underline"
            >
              support@getapexmena.com
            </a>
            .
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
