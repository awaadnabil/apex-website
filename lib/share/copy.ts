// The share pages' words, English and Arabic. Brand terms (APEX, APEX Member, Ride Stop) stay in Latin
// inside Arabic, as on the rest of the site. Perk text comes from the partner as they typed it.
import type { Locale } from '@/lib/site/content'

export type ShareCopy = {
  /** "Partner on APEX" / "Ride Stop on APEX" */
  kind: { dealer: string; ride_stop: string; club: string }
  verified: string
  /** the hero: "{perk} for every APEX rider" */
  riderPerk: (perk: string) => string
  riderPerkLabel: string
  memberPerkLabel: string
  memberPerkNote: string
  noPerk: string
  cta: { dealer: string; club: string }
  ctaNote: string
  /** "Already have APEX? Open it" */
  openApp: string
  directions: string
  instagram: string
  whatsapp: string
  website: string
  about: string
  members: (n: number) => string
  tribe: Record<string, string>
  ridesH: string
  noRides: string
  membersOnly: string
  riding: (n: number) => string
  km: (n: number) => string
  meta: {
    dealerTitle: (name: string) => string
    dealerDescription: (perk: string | null, city: string) => string
    clubTitle: (name: string) => string
    clubDescription: (members: number, nextRide: string | null) => string
  }
  notFound: { title: string; body: string; home: string }
}

const en: ShareCopy = {
  kind: { dealer: 'Partner on APEX', ride_stop: 'Ride Stop on APEX', club: 'Club on APEX' },
  verified: 'Verified',
  riderPerk: (perk) => `${perk} for every APEX rider`,
  riderPerkLabel: 'Every rider',
  memberPerkLabel: 'APEX Members also get',
  memberPerkNote: 'Show your APEX Card at the counter.',
  noPerk: 'Perks for APEX riders are coming here.',
  cta: { dealer: 'Get APEX free to unlock this', club: 'Join the club on APEX' },
  ctaNote: 'Free on iPhone and Android.',
  openApp: 'Already have APEX? Open it',
  directions: 'Directions',
  instagram: 'Instagram',
  whatsapp: 'WhatsApp',
  website: 'Website',
  about: 'About',
  members: (n) => (n === 1 ? '1 member' : `${n} members`),
  tribe: { moto: 'Motorcycles', supercar: 'Supercars', sport: 'Sports cars', offroad: 'Offroad', karting: 'Karting', classic: 'Classics', jdm: 'JDM', muscle: 'Muscle' },
  ridesH: 'Upcoming rides',
  noRides: 'The next ride is posted in the app.',
  membersOnly: 'Members only',
  riding: (n) => (n === 1 ? '1 riding' : `${n} riding`),
  km: (n) => `${n} km`,
  meta: {
    dealerTitle: (name) => `${name} · APEX`,
    dealerDescription: (perk, city) =>
      perk ? `${perk} for every APEX rider, in ${city}. Get APEX free to unlock it.` : `An APEX partner in ${city}. Get APEX free for rider perks.`,
    clubTitle: (name) => `${name} · APEX`,
    clubDescription: (members, nextRide) =>
      [members > 0 ? (members === 1 ? '1 member' : `${members} members`) : null, nextRide ? `Next ride: ${nextRide}` : null, 'Join the club on APEX.'].filter(Boolean).join(' · '),
  },
  notFound: { title: 'This page isn’t here.', body: 'The link may be old, or the partner is no longer on APEX.', home: 'Go to the APEX home page' },
}

const ar: ShareCopy = {
  kind: { dealer: 'شريك على APEX', ride_stop: 'Ride Stop على APEX', club: 'نادٍ على APEX' },
  verified: 'موثّق',
  riderPerk: (perk) => `${perk} لكل راكب على APEX`,
  riderPerkLabel: 'لكل راكب',
  memberPerkLabel: 'ويحصل أعضاء APEX Member أيضاً على',
  memberPerkNote: 'اعرض بطاقة APEX Card عند الكاشير.',
  noPerk: 'مزايا الركّاب على APEX ستظهر هنا قريباً.',
  cta: { dealer: 'حمّل APEX مجاناً لتفتح هذه الميزة', club: 'انضم إلى النادي على APEX' },
  ctaNote: 'مجاناً على iPhone وAndroid.',
  openApp: 'لديك APEX؟ افتحه',
  directions: 'الاتجاهات',
  instagram: 'Instagram',
  whatsapp: 'WhatsApp',
  website: 'الموقع',
  about: 'نبذة',
  members: (n) => (n === 1 ? 'عضو واحد' : n === 2 ? 'عضوان' : n >= 3 && n <= 10 ? `${n} أعضاء` : `${n} عضواً`),
  tribe: { moto: 'دراجات نارية', supercar: 'سيارات خارقة', sport: 'سيارات رياضية', offroad: 'طرق وعرة', karting: 'كارتينغ', classic: 'كلاسيك', jdm: 'JDM', muscle: 'Muscle' },
  ridesH: 'الرحلات القادمة',
  noRides: 'تُنشر الرحلة القادمة في التطبيق.',
  membersOnly: 'للأعضاء فقط',
  riding: (n) => (n === 1 ? 'راكب واحد' : n === 2 ? 'راكبان' : n >= 3 && n <= 10 ? `${n} ركّاب` : `${n} راكباً`),
  km: (n) => `${n} كم`,
  meta: {
    dealerTitle: (name) => `${name} · APEX`,
    dealerDescription: (perk, city) =>
      perk ? `${perk} لكل راكب على APEX، في ${city}. حمّل APEX مجاناً لتفتح الميزة.` : `شريك APEX في ${city}. حمّل APEX مجاناً لمزايا الركّاب.`,
    clubTitle: (name) => `${name} · APEX`,
    clubDescription: (members, nextRide) =>
      [members > 0 ? (members === 1 ? 'عضو واحد' : members === 2 ? 'عضوان' : members <= 10 ? `${members} أعضاء` : `${members} عضواً`) : null, nextRide ? `الرحلة القادمة: ${nextRide}` : null, 'انضم إلى النادي على APEX.'].filter(Boolean).join(' · '),
  },
  notFound: { title: 'هذه الصفحة غير موجودة.', body: 'قد يكون الرابط قديماً، أو لم يعد الشريك على APEX.', home: 'الصفحة الرئيسية' },
}

export const SHARE_COPY: Record<Locale, ShareCopy> = { en, ar }

/** Dubai clock, the GCC's reference: "Sat 14 Nov · 4:00 PM" (en) or the Arabic equivalent. */
export function formatRideWhen(iso: string, locale: Locale): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const tag = locale === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB'
  const date = d.toLocaleDateString(tag, { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Asia/Dubai' })
  const time = d.toLocaleTimeString(locale === 'ar' ? 'ar-AE-u-nu-latn' : 'en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Dubai' })
  return `${date} · ${time}`
}
