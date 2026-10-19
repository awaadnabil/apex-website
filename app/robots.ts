import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /drive and /join invite pages are NOT disallowed on purpose: they carry a
        // noindex tag, and Google has to be able to crawl a page to see that tag.
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
