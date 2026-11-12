import { PricingPage } from '@/components/site/pricing-page'
import { kitViewport, subPageMetadata } from '@/lib/site/metadata'

export const metadata = subPageMetadata({
  locale: 'ar',
  path: '/ar/pricing',
  en: '/pricing',
  ar: '/ar/pricing',
  title: 'الأسعار · APEX Member',
  description:
    'خطط APEX Member: ‏49 درهماً شهرياً، أو 399 درهماً سنوياً، أو سنة Founding Member بـ 299 درهماً لأول 50 عضواً بسعر ثابت ما دمت مشتركاً.',
})
export const viewport = kitViewport

export default function ArabicPricing() {
  return <PricingPage locale="ar" />
}
