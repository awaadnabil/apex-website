import { PricingPage } from '@/components/site/pricing-page'
import { kitViewport, subPageMetadata } from '@/lib/site/metadata'

export const metadata = subPageMetadata({
  locale: 'en',
  path: '/pricing',
  en: '/pricing',
  ar: '/ar/pricing',
  title: 'Pricing · APEX Member',
  description:
    'APEX Member plans: AED 49 a month, AED 399 a year, or a Founding Member year at AED 299 for the first 50 members, price locked while subscribed.',
})
export const viewport = kitViewport

export default function Pricing() {
  return <PricingPage locale="en" />
}
