import { RefundsPage } from '@/components/site/refunds-page'
import { kitViewport, subPageMetadata } from '@/lib/site/metadata'

export const metadata = subPageMetadata({
  locale: 'en',
  path: '/refunds',
  en: '/refunds',
  ar: '/ar/refunds',
  title: 'Refund policy · APEX',
  description:
    'Cancel APEX Member anytime and keep access to the end of the paid period. How refunds work for App Store, Android and web purchases.',
})
export const viewport = kitViewport

export default function Refunds() {
  return <RefundsPage locale="en" />
}
