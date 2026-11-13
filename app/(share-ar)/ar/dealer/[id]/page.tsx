// /ar/dealer/[id]: the Arabic twin of /dealer/[id].
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PartnerSharePage } from '@/components/share/partner-page'
import { SHARE_COPY } from '@/lib/share/copy'
import { cleanRef, shareLinks } from '@/lib/share/links'
import { detectPlatform } from '@/lib/share/platform'
import { fetchPublicPartner } from '@/lib/share/supabase'
import { COPY } from '@/lib/site/content'
import { kitViewport, SITE_URL } from '@/lib/site/metadata'

const LOCALE = 'ar' as const

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ ref?: string | string[] }> }

export const viewport = kitViewport

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const row = await fetchPublicPartner(id)
  const s = SHARE_COPY[LOCALE]
  if (!row) return { metadataBase: new URL(SITE_URL), title: s.notFound.title, robots: { index: false } }
  const links = shareLinks('dealer', row.id, LOCALE, null)
  const title = s.meta.dealerTitle(row.name)
  const description = s.meta.dealerDescription(row.community_perk, row.city)
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: links.canonical,
      languages: { en: `/dealer/${row.id}`, ar: `/ar/dealer/${row.id}`, 'x-default': `/dealer/${row.id}` },
    },
    icons: { icon: [{ url: '/img/apex-peak.svg', type: 'image/svg+xml' }], apple: '/apple-icon.png' },
    openGraph: {
      type: 'website',
      siteName: 'APEX',
      url: links.canonical,
      title,
      description,
      locale: COPY[LOCALE].meta.ogLocale,
      alternateLocale: ['en_AE'],
    },
    twitter: { card: 'summary_large_image', title, description },
    // Safari's smart banner opens the app straight onto this dealer when it is installed
    other: { 'apple-itunes-app': `app-id=6773114294, app-argument=apex://dealer/${row.id}` },
  }
}

export default async function Page({ params, searchParams }: Props) {
  const [{ id }, query, platform] = await Promise.all([params, searchParams, detectPlatform()])
  const row = await fetchPublicPartner(id)
  if (!row) notFound()
  return <PartnerSharePage partner={row} locale={LOCALE} referrer={cleanRef(query.ref)} platform={platform} />
}
