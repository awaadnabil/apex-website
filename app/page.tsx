import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/scroll-reveal'
import { CinematicFx } from '@/components/cinematic-fx'
import { IntroCurtain } from '@/components/intro-curtain'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { Stats } from '@/components/stats'
import { Tribes } from '@/components/tribes'
import { AboutFaq } from '@/components/about-faq'
import { FinalCta } from '@/components/final-cta'
import { SiteFooter } from '@/components/site-footer'
import { SITE } from '@/lib/site'

// Canonical/og:url live here, not in the layout — a layout canonical would be
// inherited by every page and point the whole site at the homepage.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  // openGraph replaces (doesn't merge with) the layout's, so restate it in full
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_AE',
    url: '/',
    title: SITE.title,
    description: SITE.description,
  },
}

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
      <AboutFaq />
      <FinalCta />
      <SiteFooter />
    </main>
  )
}
