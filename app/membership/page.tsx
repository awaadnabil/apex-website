import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/scroll-reveal'
import { CinematicFx } from '@/components/cinematic-fx'
import { SupportTopNav } from '@/components/support/support-topnav'
import { Membership } from '@/components/membership'
import { FinalCta } from '@/components/final-cta'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Membership · APEX',
  description: 'Choose your access tier and join the APEX collective.',
}

export default function MembershipPage() {
  return (
    <main className="relative min-h-screen bg-carbon font-sans text-white">
      <CinematicFx />
      <ScrollReveal />
      <SupportTopNav label="Membership" />
      <div className="pt-24">
        <Membership />
        <FinalCta />
      </div>
      <SiteFooter />
    </main>
  )
}
