import type { MetadataRoute } from 'next'

const SITE = 'https://getapexmena.com'
// Every public, indexable page with its Arabic twin. Share pages (rides, clubs, dealers) are reached by link, not listed.
const PAIRS: [string, string, number][] = [
  ['/', '/ar', 1],
  ['/download', '/ar/download', 0.9],
  ['/pricing', '/ar/pricing', 0.8],
  ['/refunds', '/ar/refunds', 0.3],
  ['/terms', '/ar/terms', 0.3],
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return PAIRS.flatMap(([en, ar, priority]) => {
    const languages = { en: `${SITE}${en}`, ar: `${SITE}${ar}` }
    return [
      { url: `${SITE}${en}`, lastModified: now, changeFrequency: 'weekly' as const, priority, alternates: { languages } },
      { url: `${SITE}${ar}`, lastModified: now, changeFrequency: 'weekly' as const, priority, alternates: { languages } },
    ]
  })
}
