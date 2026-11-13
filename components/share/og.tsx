// The 1200×630 cards WhatsApp, iMessage and Instagram show for a shared partner or club: the cover as the
// ground, the logo, the name, and the perk (or the size and next ride). Rendered by next/og (Satori) in
// the four opengraph-image.tsx routes, English and Arabic.
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { Locale } from '@/lib/site/content'
import { formatRideWhen, SHARE_COPY } from '@/lib/share/copy'
import type { PublicClub, PublicPartner } from '@/lib/share/supabase'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

type Font = { name: string; data: ArrayBuffer; weight: 500 | 600 | 700; style: 'normal' }

let fontsPromise: Promise<Font[]> | null = null

/** Outfit for Latin and IBM Plex Sans Arabic for Arabic, the site's own faces, read once per instance. */
export function loadOgFonts(): Promise<Font[]> {
  if (!fontsPromise) {
    const dir = join(process.cwd(), 'lib/share/fonts')
    const read = async (file: string, name: string, weight: Font['weight']): Promise<Font> => {
      const buf = await readFile(join(dir, file))
      return { name, data: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer, weight, style: 'normal' }
    }
    fontsPromise = Promise.all([
      read('outfit-500.ttf', 'Outfit', 500),
      read('outfit-700.ttf', 'Outfit', 700),
      read('plex-arabic-500.ttf', 'IBM Plex Sans Arabic', 500),
      read('plex-arabic-600.ttf', 'IBM Plex Sans Arabic', 600),
    ]).catch((error) => {
      console.error('[share-og] fonts', error)
      fontsPromise = null
      return []
    })
  }
  return fontsPromise
}

const INK = '#EEF2F4'
const MUTED = '#9AA4AB'
const ACCENT = '#00C8C8'
const BG = '#080808'
const FONT = 'Outfit, "IBM Plex Sans Arabic"'

const ARABIC = /[\u0600-\u06FF\u0750-\u077F]/

/**
 * Satori lays every text run out left to right, Arabic included, so a line with Arabic in it comes out
 * with its words in the wrong order. This places the words itself: each Arabic word and each run of
 * Latin words (a brand term, "5% off coffee", a number) is its own flex item, and the row runs from the
 * right. Lines without Arabic are returned as plain text.
 */
function Bidi({ text, style }: { text: string; style: React.CSSProperties }) {
  if (!ARABIC.test(text)) return <div style={{ display: 'flex', ...style }}>{text}</div>
  const items: string[] = []
  let latin: string[] = []
  for (const token of text.split(/\s+/).filter(Boolean)) {
    if (ARABIC.test(token)) {
      if (latin.length) items.push(latin.join(' '))
      latin = []
      items.push(token)
    } else {
      latin.push(token)
    }
  }
  if (latin.length) items.push(latin.join(' '))
  const gap = typeof style.fontSize === 'number' ? Math.round(style.fontSize * 0.28) : 10
  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'flex-start', columnGap: gap, rowGap: 2, ...style }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex' }}>{item}</div>
      ))}
    </div>
  )
}

function clip(text: string, max: number): string {
  const t = text.trim()
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t
}

function Frame({ cover, locale, children }: { cover: string | null; locale: Locale; children: React.ReactNode }) {
  const rtl = locale === 'ar'
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: BG, fontFamily: FONT, color: INK }}>
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} width={1200} height={630} style={{ position: 'absolute', top: 0, left: 0, width: 1200, height: 630, objectFit: 'cover' }} alt="" />
      ) : (
        <div style={{ position: 'absolute', top: 0, left: 0, width: 1200, height: 630, display: 'flex', background: 'linear-gradient(135deg, #121518 0%, #0A1416 55%, #063A3C 100%)' }} />
      )}
      {/* the ground under the words: dark from the bottom, so the name reads on any photo */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 1200, height: 630, display: 'flex', background: 'linear-gradient(to top, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.82) 42%, rgba(8,8,8,0.15) 100%)' }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '52px 64px 56px',
          alignItems: rtl ? 'flex-end' : 'flex-start',
          textAlign: rtl ? 'right' : 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, letterSpacing: 10, color: INK }}>APEX</div>
          <div style={{ display: 'flex', width: 44, height: 3, background: ACCENT }} />
        </div>
        {children}
      </div>
    </div>
  )
}

function Logo({ src }: { src: string | null }) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} width={120} height={120} style={{ width: 120, height: 120, borderRadius: 30, objectFit: 'cover', border: '4px solid #080808', display: 'flex' }} alt="" />
  ) : null
}

function Check() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function PartnerCard({ partner, locale }: { partner: PublicPartner; locale: Locale }) {
  const s = SHARE_COPY[locale]
  const rtl = locale === 'ar'
  const kind = partner.partner_type === 'ride_stop' ? s.kind.ride_stop : s.kind.dealer
  const perk = partner.community_perk ? s.riderPerk(clip(partner.community_perk, 60)) : partner.member_perk ? `${s.memberPerkLabel}: ${clip(partner.member_perk, 60)}` : null
  return (
    <Frame cover={partner.cover_url} locale={locale}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: rtl ? 'flex-end' : 'flex-start', width: '100%' }}>
        <Logo src={partner.logo_url} />
        <Bidi text={`${kind} · ${partner.city}`} style={{ marginTop: 22, fontSize: 24, color: MUTED }} />
        <div style={{ display: 'flex', flexDirection: rtl ? 'row-reverse' : 'row', alignItems: 'center', gap: 16, marginTop: 8, maxWidth: 1072 }}>
          <Bidi text={clip(partner.name, 44)} style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5 }} />
          {partner.verified ? <Check /> : null}
        </div>
        {perk ? (
          <Bidi
            text={perk}
            style={{ marginTop: 26, padding: '18px 26px', borderRadius: 22, background: ACCENT, color: BG, fontSize: 34, fontWeight: 500, lineHeight: 1.15, maxWidth: 1072 }}
          />
        ) : null}
      </div>
    </Frame>
  )
}

export function ClubCard({ club, locale }: { club: PublicClub; locale: Locale }) {
  const s = SHARE_COPY[locale]
  const rtl = locale === 'ar'
  const tribe = club.tribe ? s.tribe[club.tribe] ?? club.tribe : null
  const next = club.upcoming_rides[0]
  const line = [club.member_count > 0 ? s.members(club.member_count) : null, tribe].filter(Boolean).join(' · ')
  return (
    <Frame cover={club.cover_image_url} locale={locale}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: rtl ? 'flex-end' : 'flex-start', width: '100%' }}>
        <Bidi text={s.kind.club} style={{ fontSize: 24, color: MUTED }} />
        <div style={{ display: 'flex', flexDirection: rtl ? 'row-reverse' : 'row', alignItems: 'center', gap: 16, marginTop: 8, maxWidth: 1072 }}>
          <Bidi text={clip(club.name, 40)} style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5 }} />
          {club.is_verified ? <Check /> : null}
        </div>
        <Bidi text={line} style={{ marginTop: 14, fontSize: 30, color: INK }} />
        {next ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: rtl ? 'flex-end' : 'flex-start', marginTop: 26, padding: '16px 24px', borderRadius: 20, background: 'rgba(18,21,24,0.9)', border: `2px solid ${ACCENT}`, maxWidth: 1072 }}>
            <Bidi text={rtl ? s.ridesH : s.ridesH.toUpperCase()} style={{ fontSize: 20, color: ACCENT, letterSpacing: rtl ? 0 : 2 }} />
            <Bidi text={clip(next.title, 50)} style={{ fontSize: 32, fontWeight: 500, marginTop: 6 }} />
            <Bidi text={formatRideWhen(next.date_time, locale)} style={{ fontSize: 24, color: MUTED, marginTop: 4 }} />
          </div>
        ) : null}
      </div>
    </Frame>
  )
}
