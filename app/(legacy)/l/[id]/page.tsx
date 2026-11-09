import type { Metadata } from 'next'
import { CinematicFx } from '@/components/cinematic-fx'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SiteFooter } from '@/components/site-footer'
import { ListingRedirect } from './ListingRedirect'

const SUPABASE_URL = 'https://lsstkxtzttvdwetwehwm.supabase.co'
// Publishable key — the same one that ships inside the mobile app bundle.
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'sb_publishable_lqKDzYag04rFB2UXyKLo5Q_ccYIP1_T'

// Only public listing fields. The seller's phone is never fetched here, so it
// can't leak into the page or its OG meta.
type Listing = {
  title?: string | null
  make?: string | null
  model?: string | null
  price?: number | null
  currency?: string | null
  contact_on_request?: boolean | null
  location?: string | null
  year?: number | null
  photos?: string[] | null
}

async function getListing(id: string): Promise<Listing | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/marketplace_listings?id=eq.${encodeURIComponent(id)}&is_active=eq.true` +
        '&select=title,make,model,price,currency,contact_on_request,location,year,photos',
      {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        next: { revalidate: 300 },
      },
    )
    if (!res.ok) return null
    const rows = (await res.json()) as Listing[]
    return rows?.[0] ?? null
  } catch {
    return null
  }
}

const clean = (v: unknown) => {
  const s = v == null ? '' : String(v).trim()
  return s && s !== 'null' && s !== 'undefined' ? s : null
}

function names(l: Listing | null): { name: string; price: string | null } {
  const make = clean(l?.make)
  const model = clean(l?.model)
  const name = make && model ? `${make} ${model}` : clean(l?.title) ?? 'A listing on APEX Market'
  const n = Number(l?.price)
  const price =
    l && !l.contact_on_request && l.price != null && Number.isFinite(n) && n > 0
      ? `${clean(l.currency) ?? 'AED'} ${Math.round(n).toLocaleString('en-US')}`
      : null
  return { name, price }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const listing = await getListing(id)
  const { name, price } = names(listing)
  const title = price ? `${name} · ${price}` : name
  const description = [clean(listing?.year), clean(listing?.location), 'For sale on APEX Market']
    .filter(Boolean)
    .join(' · ')
  const photo = clean(listing?.photos?.[0])
  return {
    title: `${title} · APEX`,
    description,
    openGraph: {
      title,
      description,
      url: `https://getapexmena.com/l/${id}`,
      siteName: 'APEX',
      type: 'website',
      ...(photo ? { images: [{ url: photo }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, ...(photo ? { images: [photo] } : {}) },
    other: {
      'apple-itunes-app': `app-id=6773114294, app-argument=apex://l/${id}`,
    },
  }
}

export default async function ListingSharePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const listing = await getListing(id)
  const { name, price } = names(listing)
  const photo = clean(listing?.photos?.[0])

  return (
    <main className="relative min-h-screen bg-carbon font-sans text-white">
      <CinematicFx />
      <ScrollReveal />

      <section className="flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-24 text-center">
        <span className="reveal text-xl font-extrabold tracking-[0.04em] text-white md:text-2xl">
          APEX
        </span>

        <p className="reveal mt-10 text-[11px] font-semibold uppercase tracking-[0.5em] text-teal">
          For sale on APEX Market
        </p>

        {photo ? (
          <img
            src={photo}
            alt={name}
            className="reveal mt-8 aspect-[4/3] w-full max-w-md rounded-3xl border border-white/10 object-cover"
          />
        ) : null}

        <h1 className="reveal mt-8 text-balance font-extrabold leading-[0.95] text-white [font-size:clamp(2.25rem,7vw,4.5rem)]">
          {name}
        </h1>
        {price ? (
          <p className="reveal mt-4 font-mono text-2xl font-bold tracking-[0.04em] text-teal">{price}</p>
        ) : null}

        <ListingRedirect id={id} />
      </section>

      <SiteFooter />
    </main>
  )
}
