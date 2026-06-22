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
    body: 'Account details you provide — name, email, and membership tier — along with activity within the APEX app such as saved routes, events you attend, and the tribes you join.',
  },
  {
    no: '02',
    title: 'How we use it',
    body: 'To operate your membership, surface relevant meets and routes, coordinate track-day priority, and keep the collective secure. We never sell your personal data.',
  },
  {
    no: '03',
    title: 'Who can see it',
    body: 'Your profile is visible to verified members of the collective. Concierge requests are handled only by the APEX team. We share data with processors strictly to run the service.',
  },
  {
    no: '04',
    title: 'Your control',
    body: 'You can request a copy of your data, correct it, or delete your account at any time by contacting the concierge. Removal is permanent and clears your saved routes and history.',
  },
  {
    no: '05',
    title: 'Retention & security',
    body: 'We hold your data only as long as your membership is active, plus the period required by law. Information is encrypted in transit and access is restricted to authorized staff.',
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
            we collect and how we protect it. Last updated June 2026.
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
