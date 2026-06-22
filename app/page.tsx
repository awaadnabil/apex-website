import { ScrollReveal } from '@/components/scroll-reveal'
import { CinematicFx } from '@/components/cinematic-fx'
import { IntroCurtain } from '@/components/intro-curtain'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { Stats } from '@/components/stats'
import { Tribes } from '@/components/tribes'
import { FinalCta } from '@/components/final-cta'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="relative min-h-screen bg-carbon font-sans text-white">
      <IntroCurtain />
      <CinematicFx />
      <ScrollReveal />
      <SiteNav />
      <Hero />
      <Stats />
      <Tribes />
      <FinalCta />
      <SiteFooter />
    </main>
  )
}
