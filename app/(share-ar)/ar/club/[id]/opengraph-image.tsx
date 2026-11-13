// The link-preview card for /ar/club/[id], 1200×630 (see components/share/og.tsx).
import { ImageResponse } from 'next/og'
import { ClubCard, loadOgFonts, OG_CONTENT_TYPE, OG_SIZE } from '@/components/share/og'
import { fetchPublicClub } from '@/lib/share/supabase'

export const alt = 'نادٍ على APEX'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [row, fonts] = await Promise.all([fetchPublicClub(id), loadOgFonts()])
  if (!row) return new Response('Not found', { status: 404 })
  return new ImageResponse(<ClubCard club={row} locale="ar" />, {
    ...size,
    ...(fonts.length ? { fonts } : {}),
    headers: { 'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=86400' },
  })
}
