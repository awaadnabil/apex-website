'use client'

import { MotionConfig } from 'framer-motion'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { EASE } from './motion'

export type Lang = 'en' | 'ar'

const en = {
  nav: {
    home: 'APEX — back to top',
    membership: 'Membership',
    concierge: 'Concierge',
    privacy: 'Privacy',
    language: 'Language',
  },
  hero: {
    eyebrow: 'Convoy live · Jebel Jais · 02:14',
    title: 'Own the night road.',
    lede: 'Find drives, run convoys in formation, and relive every kilometre as the road you actually drove. Built for the GCC car community.',
    second: 'الطريق ليلاً لك.',
    secondLang: 'ar',
    cta: 'Get the app',
    ghost: 'See clubs',
    tilt: 'Steer with tilt',
  },
  telemetry: {
    label: 'Live route telemetry',
    route: 'Route',
    routeValue: 'RAK-E311 → Jais summit',
    dist: 'Dist',
    elev: 'Elev',
    cars: 'Cars',
    km: 'km',
    m: 'm',
  },
  story: {
    eyebrow: 'How APEX drives',
    acts: [
      {
        key: 'Find',
        title: 'Find the drive.',
        body: 'Every meet, night run and sunrise climb across the GCC on one map. Filter by club, car or road, then tap in.',
      },
      {
        key: 'Convoy',
        title: 'Run it in formation.',
        body: 'Live positions for every car in the convoy. The lead sets the pace, the sweep holds the tail, and everyone sees the gaps.',
      },
      {
        key: 'Relive',
        title: 'Relive the road.',
        body: 'Your route replays as the road you actually drove: every bend, every climb, every kilometre.',
      },
    ],
  },
  phone: {
    nearYou: 'Near you',
    tonight: 'Tonight · 02:30',
    climb: 'Jais Night Climb',
    climbMeta: '14 cars · Desert Runners',
    lead: 'Lead',
    gap: 'Gap',
    cars: 'cars',
    replay: 'Replay',
  },
  numbers: {
    eyebrow: 'On the odometer',
    title: 'The community, measured in kilometres.',
    items: [
      { value: '48,210', label: 'Kilometres driven together' },
      { value: '1,306', label: 'Convoys completed' },
      { value: '212', label: 'Clubs on APEX' },
    ],
    note: 'Sample figures for illustration.',
  },
  clubs: {
    eyebrow: 'Clubs',
    title: 'Your club, in your pocket.',
    body: 'Join a club, earn your pass, and unlock members-only drives. Inner Circle is by invitation only.',
    cta: 'View membership',
    stackLabel: 'APEX club membership passes',
  },
  market: {
    eyebrow: 'Market',
    title: 'Cars that come with a story.',
    body: 'Buy and sell inside the community. Every listing shows the roads the car has driven.',
    hint: 'Drag to browse',
    prev: 'Previous car',
    next: 'Next car',
    note: 'Sample listings for illustration.',
    label: 'Cars for sale',
    year: 'Year',
    routes: 'routes',
    currency: 'AED',
  },
  footer: {
    line: 'Own the night road.',
    body: 'Get APEX on iPhone and Android, across the GCC.',
    appStoreTop: 'Download on the',
    appStore: 'App Store',
    playTop: 'Get it on',
    play: 'Google Play',
    membership: 'Membership',
    concierge: 'Concierge',
    privacy: 'Privacy',
    rights: '© 2026 APEX · getapexmena.com',
  },
}

type Dict = typeof en

const ar: Dict = {
  nav: {
    home: 'APEX — العودة للأعلى',
    membership: 'العضوية',
    concierge: 'الكونسيرج',
    privacy: 'الخصوصية',
    language: 'اللغة',
  },
  hero: {
    eyebrow: 'قافلة مباشرة · جبل جيس · 02:14',
    title: 'الطريق ليلاً لك.',
    lede: 'اعثر على الرحلات، وقُد القوافل في تشكيل واحد، وعِش كل كيلومتر من جديد كما قدته فعلاً. صُمّم لمجتمع السيارات في الخليج.',
    second: 'Own the night road.',
    secondLang: 'en',
    cta: 'حمّل التطبيق',
    ghost: 'تصفّح الأندية',
    tilt: 'وجّه بالإمالة',
  },
  telemetry: {
    label: 'بيانات المسار المباشرة',
    route: 'المسار',
    routeValue: 'RAK-E311 ← قمة جيس',
    dist: 'المسافة',
    elev: 'الارتفاع',
    cars: 'السيارات',
    km: 'كم',
    m: 'م',
  },
  story: {
    eyebrow: 'كيف يعمل APEX',
    acts: [
      {
        key: 'اكتشف',
        title: 'اعثر على الرحلة.',
        body: 'كل لقاء وجولة ليلية وصعود فجري في الخليج على خريطة واحدة. فلتر حسب النادي أو السيارة أو الطريق، ثم انضم.',
      },
      {
        key: 'القافلة',
        title: 'قُدها في تشكيل.',
        body: 'مواقع حية لكل سيارة في القافلة. القائد يحدد الإيقاع، والأخير يحمي المؤخرة، والجميع يرى المسافات.',
      },
      {
        key: 'استعد',
        title: 'عِش الطريق من جديد.',
        body: 'يُعاد تشغيل مسارك كما قدته فعلاً: كل منعطف، وكل صعود، وكل كيلومتر.',
      },
    ],
  },
  phone: {
    nearYou: 'بالقرب منك',
    tonight: 'الليلة · 02:30',
    climb: 'صعود جيس الليلي',
    climbMeta: '14 سيارة · Desert Runners',
    lead: 'القائد',
    gap: 'المسافة',
    cars: 'سيارات',
    replay: 'إعادة',
  },
  numbers: {
    eyebrow: 'على العدّاد',
    title: 'المجتمع، مقاساً بالكيلومترات.',
    items: [
      { value: '48,210', label: 'كيلومتر قُطعت معاً' },
      { value: '1,306', label: 'قافلة مكتملة' },
      { value: '212', label: 'نادٍ على APEX' },
    ],
    note: 'أرقام توضيحية.',
  },
  clubs: {
    eyebrow: 'الأندية',
    title: 'ناديك في جيبك.',
    body: 'انضم إلى نادٍ، واحصل على بطاقتك، وافتح رحلات حصرية للأعضاء. الدائرة المقربة بالدعوة فقط.',
    cta: 'عرض العضوية',
    stackLabel: 'بطاقات عضوية أندية APEX',
  },
  market: {
    eyebrow: 'السوق',
    title: 'سيارات تأتي مع قصة.',
    body: 'بِع واشترِ داخل المجتمع. كل إعلان يعرض الطرق التي قطعتها السيارة.',
    hint: 'اسحب للتصفح',
    prev: 'السيارة السابقة',
    next: 'السيارة التالية',
    note: 'إعلانات توضيحية.',
    label: 'سيارات للبيع',
    year: 'السنة',
    routes: 'مسار',
    currency: 'درهم',
  },
  footer: {
    line: 'الطريق ليلاً لك.',
    body: 'احصل على APEX على iPhone وAndroid في جميع أنحاء الخليج.',
    appStoreTop: 'حمّله من',
    appStore: 'App Store',
    playTop: 'احصل عليه من',
    play: 'Google Play',
    membership: 'العضوية',
    concierge: 'الكونسيرج',
    privacy: 'الخصوصية',
    rights: '© 2026 APEX · getapexmena.com',
  },
}

const dictionaries: Record<Lang, Dict> = { en, ar }

type LangContextValue = {
  lang: Lang
  dir: 'ltr' | 'rtl'
  t: Dict
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
    return () => {
      root.lang = 'en'
      root.dir = 'ltr'
    }
  }, [lang, dir])

  const value = useMemo(
    () => ({ lang, dir, t: dictionaries[lang], setLang }) as LangContextValue,
    [lang, dir],
  )

  return (
    <LangContext.Provider value={value}>
      <MotionConfig reducedMotion="user" transition={{ ease: EASE }}>
        <div
          lang={lang}
          dir={dir}
          className="drive min-h-screen bg-night font-body text-bone"
        >
          {children}
        </div>
      </MotionConfig>
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}
