// Structured data for Google: the organisation and the app itself (iOS + Android), so search can show
// APEX as an app with its price and platforms. Rendered once on each home page.
const SITE = 'https://getapexmena.com'

export function AppJsonLd({ locale }: { locale: 'en' | 'ar' }) {
  const ar = locale === 'ar'
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'APEX',
      alternateName: 'APEX MENA',
      url: SITE,
      logo: `${SITE}/apple-icon.png`,
      sameAs: ['https://www.instagram.com/getapexmena', 'https://apps.apple.com/app/id6773114294'],
      areaServed: ['AE', 'SA', 'OM', 'KW', 'QA', 'BH'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: 'APEX',
      operatingSystem: 'iOS, Android',
      applicationCategory: 'SocialNetworkingApplication',
      inLanguage: ['en', 'ar'],
      url: ar ? `${SITE}/ar` : SITE,
      downloadUrl: [`https://apps.apple.com/app/id6773114294`, `${SITE}/download`],
      description: ar
        ? 'تطبيق مجتمع الدراجات النارية والسيارات في الإمارات والخليج: رحلات جماعية، تتبّع مباشر، لوحة صدارة أسبوعية، وخصومات لدى الشركاء.'
        : 'The motorcycle and car community app for the UAE and GCC: group rides, live ride tracking, a weekly leaderboard and partner discounts.',
      offers: [
        { '@type': 'Offer', name: 'APEX Rider', price: '0', priceCurrency: 'AED' },
        { '@type': 'Offer', name: 'APEX Member (monthly)', price: '49', priceCurrency: 'AED' },
        { '@type': 'Offer', name: 'APEX Member (annual)', price: '399', priceCurrency: 'AED' },
      ],
    },
  ]
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
