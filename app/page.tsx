import { ScrollReveal } from '@/components/scroll-reveal'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { Stats } from '@/components/stats'
import { Tribes } from '@/components/tribes'
import { Story } from '@/components/story'
import { Roads } from '@/components/roads'
import { Membership } from '@/components/membership'
import { FinalCta } from '@/components/final-cta'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="relative min-h-screen bg-carbon font-sans text-white">
      <ScrollReveal />
      <SiteNav />
      <Hero />
      <Stats />
      <Tribes />
      <Story />
      <Roads />
      <Membership />
      <FinalCta />
      <SiteFooter />
    </main>
  )
}
