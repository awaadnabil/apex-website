import type { Metadata, Viewport } from 'next'
import { COPY, type Locale } from './content'

export const SITE_URL = 'https://getapexmena.com'

export const kitViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
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
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: c.meta.title }],
    },
    twitter: { card: 'summary_large_image', title: c.meta.title, description: c.meta.description, images: ['/og.jpg'] },
    other: { 'apple-itunes-app': 'app-id=6773114294' },
  }
}
