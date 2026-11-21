import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/dev/', '/ar/dev/', '/card/', '/concierge'] }],
    sitemap: 'https://getapexmena.com/sitemap.xml',
    host: 'https://getapexmena.com',
  }
}
