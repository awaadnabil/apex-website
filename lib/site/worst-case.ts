// break-ui fixture (dev only): the same shapes as COPY and MEDIA with the realistic worst case.
// Long values are the longest plausible ones for each slot (a marketing edit, a fuller Arabic phrasing);
// missing pictures are paths that 404, as a deleted or renamed upload would.
import { COPY, type Copy } from './content'
import { MEDIA, type Media } from '@/components/site/home'

const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x))

function worst(c: Copy): Copy {
  const w = clone(c)
  if (c.locale === 'ar') {
    w.hero.h1 = 'تطبيق مجتمع السيارات والدراجات النارية للسائقين والراكبين في دول الخليج'
    w.rides.h2 = 'رحلات المجتمع بنقطة تجمّع واضحة وموعد انطلاق محدّد وقائد معروف للمجموعة.'
    w.partners.cols[0].title = 'الوكلاء ومتاجر قطع الغيار والمعدات ومراكز الصيانة في السوق'
    w.xp.share.buttons = ['مشاركة قصة على Instagram', 'إرسال عبر WhatsApp', 'الحفظ في ألبوم الصور', 'النشر في ملفي الشخصي على APEX']
    w.nav.cta = 'نزّل تطبيق APEX الآن'
    w.faq.items[0].a = w.faq.items[0].a + ' ' + w.faq.items[0].a
  } else {
    w.hero.h1 = 'Motor community app for GCC motorcycle riders and car drivers'
    w.rides.h2 = 'Community rides with a clear meetup point, a set roll time and a named leader.'
    w.partners.cols[0].title = 'Dealers, parts shops, gear stores and service centres on the Market'
    w.xp.share.buttons = ['Share an Instagram story', 'Send on WhatsApp', 'Save to Photos album', 'Post to my APEX profile']
    w.nav.cta = 'Download the APEX app'
    w.faq.items[0].a = w.faq.items[0].a + ' ' + w.faq.items[0].a
  }
  w.xp.spotlight.rows = [
    { rank: '1', xp: 12_480 },
    { rank: '2', xp: 9_005 },
    { rank: '3', xp: 1 },
  ]
  return w
}

export const WORST: Record<'en' | 'ar', Copy> = { en: worst(COPY.en), ar: worst(COPY.ar) }

export const MISSING_MEDIA: Media = {
  ...MEDIA,
  heroScreen: 'missing-screen',
  marketPhoto: 'missing-photo',
  cardPhoto: 'missing-photo',
  formPhoto: 'missing-photo',
  marketScreen: 'missing-screen',
}
