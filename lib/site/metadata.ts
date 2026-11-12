import type { Metadata, Viewport } from 'next'
import { COPY, type Locale } from './content'

export const SITE_URL = 'https://getapexmena.com'

export const kitViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // the Android keyboard shrinks the layout like iOS does, so the phone bar and form react to it
  interactiveWidget: 'resizes-content',
  colorScheme: 'dark',
  themeColor: '#080808',
}

export function homeMetadata(locale: Locale): Metadata {
  const c = COPY[locale]
  return {
    metadataBase: new URL(SITE_URL),
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical: c.home,
      languages: { en: '/', ar: '/ar', 'x-default': '/' },
    },
    icons: { icon: [{ url: '/img/apex-peak.svg', type: 'image/svg+xml' }], apple: '/apple-icon.png' },
    openGraph: {
      type: 'website',
      siteName: 'APEX',
      url: c.home,
      title: c.meta.title,
      description: c.meta.description,
      locale: c.meta.ogLocale,
      alternateLocale: locale === 'en' ? ['ar_AE'] : ['en_AE'],
      images: [{ url: locale === 'ar' ? '/og-ar.jpg' : '/og.jpg', width: 1200, height: 630, alt: c.meta.title }],
    },
    twitter: { card: 'summary_large_image', title: c.meta.title, description: c.meta.description, images: [locale === 'ar' ? '/og-ar.jpg' : '/og.jpg'] },
    other: { 'apple-itunes-app': 'app-id=6773114294' },
  }
}

/** A kit sub-page's metadata: its own title and description, canonical, the en/ar pair and the share card. */
export function subPageMetadata({
  locale,
  path,
  en,
  ar,
  title,
  description,
}: {
  locale: Locale
  /** this page's path */
  path: string
  /** the English and Arabic paths of the pair */
  en: string
  ar: string
  title: string
  description: string
}): Metadata {
  const image = locale === 'ar' ? '/og-ar.jpg' : '/og.jpg'
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: path, languages: { en, ar, 'x-default': en } },
    icons: { icon: [{ url: '/img/apex-peak.svg', type: 'image/svg+xml' }], apple: '/apple-icon.png' },
    openGraph: {
      type: 'website',
      siteName: 'APEX',
      url: path,
      title,
      description,
      locale: COPY[locale].meta.ogLocale,
      alternateLocale: locale === 'en' ? ['ar_AE'] : ['en_AE'],
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}
