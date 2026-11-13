// Where a share page sends people: the store for the platform they are on, the app if they have it, the
// partner's own channels. The referrer (?ref=<userId>) rides along on every one of those so the install
// is credited.
import { APP_STORE_URL } from '@/lib/site/content'
import type { Locale } from '@/lib/site/content'
import { isUuid, type PublicPartner } from './supabase'

export const SITE_URL = 'https://getapexmena.com'
/** the cookie /join reads later; a month, the whole site, first-party only */
export const REF_COOKIE = 'apex_ref'
export const REF_COOKIE_MAX_AGE = 60 * 60 * 24 * 30

/** The ref query value when it is a user id, else null. Anything else is dropped, never forwarded. */
export function cleanRef(raw: string | string[] | undefined): string | null {
  const value = Array.isArray(raw) ? raw[0] : raw
  return isUuid(value) ? value.toLowerCase() : null
}

function withRef(url: string, ref: string | null): string {
  if (!ref) return url
  return `${url}${url.includes('?') ? '&' : '?'}ref=${encodeURIComponent(ref)}`
}

export type ShareLinks = {
  /** apex://dealer/<id>?ref=… or apex://club/<id>?ref=…: opens the app when it is installed */
  deepLink: string
  /** the App Store on iPhone, /download (or /ar/download) on Android, both carrying the ref */
  appStore: string
  download: string
  /** this page's canonical https URL (no ref: the card is the same for everyone) */
  canonical: string
  /** the same page in the other language */
  alternate: string
}

export function shareLinks(kind: 'dealer' | 'club', id: string, locale: Locale, ref: string | null): ShareLinks {
  const ar = locale === 'ar'
  return {
    deepLink: withRef(`apex://${kind}/${id}`, ref),
    appStore: withRef(APP_STORE_URL, ref),
    download: withRef(ar ? '/ar/download' : '/download', ref),
    canonical: `${SITE_URL}${ar ? '/ar' : ''}/${kind}/${id}`,
    alternate: `${ar ? '' : '/ar'}/${kind}/${id}`,
  }
}

/** Google Maps directions: coordinates first, then a place id, then a maps link stored as the address, then a search by name. */
export function directionsUrl(p: PublicPartner): string | null {
  if (p.latitude != null && p.longitude != null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${p.latitude},${p.longitude}`
  }
  if (p.google_place_id) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(p.name)}&destination_place_id=${encodeURIComponent(p.google_place_id)}`
  }
  if (p.address && /^https?:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps|(www\.)?google\.[a-z.]+\/maps|maps\.google\.[a-z.]+)/i.test(p.address)) {
    return p.address
  }
  const query = [p.name, p.address, p.city].filter(Boolean).join(', ')
  return query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : null
}

/** https://wa.me/<digits>: WhatsApp wants the number without +, spaces or dashes. */
export function whatsappUrl(number: string | null): string | null {
  if (!number) return null
  const digits = number.replace(/[^\d]/g, '')
  return digits.length >= 8 ? `https://wa.me/${digits}` : null
}

/** A full Instagram URL, or the profile for a bare handle. */
export function instagramUrl(value: string | null): string | null {
  if (!value) return null
  const v = value.trim()
  if (/^https?:\/\//i.test(v)) return v
  const handle = v.replace(/^@/, '').replace(/[^A-Za-z0-9._]/g, '')
  return handle ? `https://instagram.com/${handle}` : null
}

export function websiteUrl(value: string | null): string | null {
  if (!value) return null
  const v = value.trim()
  if (!v) return null
  return /^https?:\/\//i.test(v) ? v : `https://${v}`
}
