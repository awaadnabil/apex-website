import { RefundsPage } from '@/components/site/refunds-page'
import { kitViewport, subPageMetadata } from '@/lib/site/metadata'

export const metadata = subPageMetadata({
  locale: 'ar',
  path: '/ar/refunds',
  en: '/refunds',
  ar: '/ar/refunds',
  title: 'سياسة الاسترداد · APEX',
  description:
    'ألغِ عضوية APEX Member في أي وقت واحتفظ بها حتى نهاية الفترة المدفوعة. كيف يتم الاسترداد لمشتريات App Store وAndroid والويب.',
})
export const viewport = kitViewport

export default function ArabicRefunds() {
  return <RefundsPage locale="ar" />
}
