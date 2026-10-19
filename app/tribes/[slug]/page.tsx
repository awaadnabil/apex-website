import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CinematicFx } from '@/components/cinematic-fx'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SiteFooter } from '@/components/site-footer'
import { ApexButton } from '@/components/apex-button'
import { JsonLd } from '@/components/json-ld'
import { SITE, TRIBES } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return TRIBES.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tribe = TRIBES.find((t) => t.slug === slug)
  if (!tribe) return {}
  const url = `/tribes/${tribe.slug}`
  return {
    title: tribe.metaTitle,
    description: tribe.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      url,
      title: `${tribe.metaTitle} · APEX`,
      description: tribe.metaDescription,
      images: [{ url: tribe.img, alt: tribe.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tribe.metaTitle} · APEX`,
      description: tribe.metaDescription,
      images: [tribe.img],
    },
  }
}

export default async function TribePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tribe = TRIBES.find((t) => t.slug === slug)
  if (!tribe) notFound()

  const others = TRIBES.filter((t) => t.slug !== tribe.slug)

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'APEX', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Tribes', item: `${SITE.url}/#tribes` },
      { '@type': 'ListItem', position: 3, name: tribe.name, item: `${SITE.url}/tribes/${tribe.slug}` },
    ],
  }

  return (
    <main className="relative min-h-screen bg-carbon font-sans text-white">
      <JsonLd data={breadcrumbs} />
      <CinematicFx />
      <ScrollReveal />

      {/* Hero */}
      <section className="relative flex min-h-[78svh] flex-col justify-end overflow-hidden px-6 pb-20 pt-36 md:px-10">
        <img
          src={tribe.img}
          alt={tribe.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.45]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/30 via-carbon/20 to-carbon" />
        <div className="relative mx-auto w-full max-w-6xl">
          <nav aria-label="Breadcrumb" className="reveal text-[10px] font-semibold uppercase tracking-[0.4em] text-white/60">
            <Link href="/" className="hover:text-white">
              APEX
            </Link>
            <span className="mx-3 text-white/25">/</span>
            <span className="text-teal">{tribe.name}</span>
          </nav>
          <h1 className="reveal mt-6 max-w-4xl text-balance font-extrabold leading-[0.95] [font-size:clamp(2.25rem,6.5vw,5rem)]">
            {tribe.heading}
          </h1>
          <p className="reveal mt-8 max-w-2xl text-[15px] leading-relaxed text-white/70 md:text-base">
            {tribe.intro}
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-4">
            <ApexButton href="/concierge" variant="solid">
              Request Access
            </ApexButton>
            <ApexButton href="/download" variant="white">
              Get the app
            </ApexButton>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3 md:gap-10">
          {tribe.points.map((p, i) => (
            <article key={p.title} className="reveal border-t border-white/10 pt-8" style={{ transitionDelay: `${i * 100}ms` }}>
              <h2 className="text-lg font-bold text-white">{p.title}</h2>
              <p className="mt-4 text-[14px] leading-relaxed text-white/55">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Where */}
      <section className="border-y border-white/5 px-6 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="reveal text-[11px] font-semibold uppercase tracking-[0.5em] text-gold">
            Where the {tribe.name} tribe goes
          </h2>
          <ul className="reveal mt-10 flex flex-wrap gap-x-10 gap-y-5">
            {tribe.places.map((p) => (
              <li key={p} className="font-extrabold text-white/85 [font-size:clamp(1.25rem,3vw,2rem)]">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Other tribes */}
      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="reveal text-[11px] font-semibold uppercase tracking-[0.5em] text-white/50">
            Other tribes
          </h2>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {others.map((t) => (
              <Link
                key={t.slug}
                href={`/tribes/${t.slug}`}
                className="reveal group relative block h-48 overflow-hidden"
              >
                <img
                  src={t.img}
                  alt={t.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.35] transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
                />
                <span className="absolute bottom-5 left-5 font-extrabold uppercase tracking-[0.2em] text-white">
                  {t.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
