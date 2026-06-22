import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/scroll-reveal'
import { CinematicFx } from '@/components/cinematic-fx'
import { SupportTopNav } from '@/components/support/support-topnav'
import { HelpCenter } from '@/components/support/help-center'
import { SupportChannels } from '@/components/support/support-channels'
import { SupportContactForm } from '@/components/support/support-contact-form'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Support · APEX',
  description:
    'The APEX concierge desk — search the help center, reach a live agent, or send a request. Members are answered within the hour.',
}

export default function SupportPage() {
  return (
    <main className="relative min-h-screen bg-carbon font-sans text-white">
      <CinematicFx />
      <ScrollReveal />
      <SupportTopNav />

      {/* Hero */}
      <section className="flex min-h-[60svh] flex-col justify-center px-6 pb-16 pt-36 md:px-10 md:pt-44">
        <div className="mx-auto w-full max-w-6xl">
          <p className="reveal text-[11px] font-semibold uppercase tracking-[0.5em] text-gold">
            Concierge & Support
          </p>
          <h1 className="reveal mt-6 max-w-4xl text-balance font-extrabold leading-[0.9] [font-size:clamp(3rem,11vw,8rem)]">
            We&apos;re here, <span className="text-gold">always.</span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-[15px] leading-relaxed text-white/55 md:text-base">
            Answers in seconds, a human in minutes. Search the help center, pick a channel, or
            send the concierge desk a note — whichever suits the moment.
          </p>
        </div>
      </section>

      <HelpCenter />
      <SupportChannels />
      <SupportContactForm />
      <SiteFooter />
    </main>
  )
}
