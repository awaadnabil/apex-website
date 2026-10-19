import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Syne } from 'next/font/google'
import { JsonLd } from '@/components/json-ld'
import { SITE } from '@/lib/site'
import './globals.css'

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: '%s · APEX',
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'APEX app',
    'car community Dubai',
    'supercar club Dubai',
    'motorcycle group rides Dubai',
    'superbike community UAE',
    'car meets Dubai',
    'karting Dubai',
    'offroad group UAE',
    'GCC motor community',
  ],
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_AE',
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
  },
  // iOS Safari smart app banner — one-tap install from any page
  itunes: { appId: SITE.appStoreId },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  // Paste the token from Search Console / Bing Webmaster here if you verify by meta tag
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080808',
  // userScalable:false removed — blocking zoom fails Lighthouse accessibility
}

const sameAs = [...SITE.sameAs, SITE.instagram].filter(Boolean)

const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#org`,
      name: SITE.name,
      alternateName: [SITE.legalName, 'APEX Motors', 'getapexmena'],
      url: SITE.url,
      logo: `${SITE.url}/apple-icon.png`,
      slogan: SITE.tagline,
      areaServed: SITE.areaServed,
      sameAs,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      alternateName: SITE.legalName,
      inLanguage: 'en',
      publisher: { '@id': `${SITE.url}/#org` },
    },
    {
      '@type': 'MobileApplication',
      '@id': `${SITE.url}/#app`,
      name: SITE.name,
      alternateName: SITE.legalName,
      description: SITE.description,
      operatingSystem: 'iOS, Android',
      applicationCategory: 'LifestyleApplication',
      url: `${SITE.url}/download`,
      installUrl: SITE.appStoreUrl,
      downloadUrl: [SITE.appStoreUrl, SITE.apkUrl],
      publisher: { '@id': `${SITE.url}/#org` },
      offers: [
        { '@type': 'Offer', price: '0', priceCurrency: 'AED', name: 'Download' },
        { '@type': 'Offer', price: '49', priceCurrency: 'AED', name: 'APEX Member — monthly' },
        { '@type': 'Offer', price: '399', priceCurrency: 'AED', name: 'APEX Member — annual' },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${syne.variable} bg-[#080808]`}>
      <body className="bg-[#080808] font-sans antialiased">
        <JsonLd data={siteGraph} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
