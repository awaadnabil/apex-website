// /club/[id]: a club shared from the app, for someone without it.
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ClubSharePage } from '@/components/share/club-page'
import { SHARE_COPY } from '@/lib/share/copy'
import { cleanRef, shareLinks } from '@/lib/share/links'
import { detectPlatform } from '@/lib/share/platform'
import { fetchPublicClub } from '@/lib/share/supabase'
import { COPY } from '@/lib/site/content'
import { kitViewport, SITE_URL } from '@/lib/site/metadata'

const LOCALE = 'en' as const

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ ref?: string | string[] }> }

export const viewport = kitViewport

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const row = await fetchPublicClub(id)
  const s = SHARE_COPY[LOCALE]
  if (!row) return { metadataBase: new URL(SITE_URL), title: s.notFound.title, robots: { index: false } }
  const links = shareLinks('club', row.id, LOCALE, null)
  const title = s.meta.clubTitle(row.name)
  const description = s.meta.clubDescription(row.member_count, row.upcoming_rides[0]?.title ?? null)
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: links.canonical,
      languages: { en: `/club/${row.id}`, ar: `/ar/club/${row.id}`, 'x-default': `/club/${row.id}` },
    },
    icons: { icon: [{ url: '/img/apex-peak.svg', type: 'image/svg+xml' }], apple: '/apple-icon.png' },
    openGraph: {
      type: 'website',
      siteName: 'APEX',
      url: links.canonical,
      title,
      description,
      locale: COPY[LOCALE].meta.ogLocale,
      alternateLocale: ['ar_AE'],
    },
    twitter: { card: 'summary_large_image', title, description },
    // Safari's smart banner opens the app straight onto this club when it is installed
    other: { 'apple-itunes-app': `app-id=6773114294, app-argument=apex://club/${row.id}` },
  }
}

export default async function Page({ params, searchParams }: Props) {
  const [{ id }, query, platform] = await Promise.all([params, searchParams, detectPlatform()])
  const row = await fetchPublicClub(id)
  if (!row) notFound()
  return <ClubSharePage club={row} locale={LOCALE} referrer={cleanRef(query.ref)} platform={platform} />
}
