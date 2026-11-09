import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import {
  Hanken_Grotesk,
  IBM_Plex_Sans_Arabic,
  JetBrains_Mono,
  Michroma,
  Syne,
} from 'next/font/google'
import './globals.css'

// Syne is still used by the Membership, Concierge and Privacy pages.
const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const michroma = Michroma({
  variable: '--font-michroma',
  subsets: ['latin'],
  weight: '400',
})

const hanken = Hanken_Grotesk({
  variable: '--font-hanken',
  subsets: ['latin'],
})

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
})

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: '--font-plex-arabic',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://getapexmena.com'),
  title: 'APEX — Own the night road',
  description:
    'Find drives, run live convoys in formation, and relive every kilometre as the road you actually drove. Built for the GCC car community.',
  generator: 'v0.app',
  openGraph: {
    title: 'APEX — Own the night road',
    description:
      'Find drives, run convoys in formation, and relive every route. Built for the GCC car community.',
    url: 'https://getapexmena.com',
    siteName: 'APEX',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#05070c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${michroma.variable} ${hanken.variable} ${jetbrains.variable} ${plexArabic.variable} bg-[#05070c]`}
    >
      <body className="bg-[#05070c] font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
