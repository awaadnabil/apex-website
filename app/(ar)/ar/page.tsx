import { AppJsonLd } from '@/components/seo/app-jsonld'
import { Home } from '@/components/site/home'
import { COPY } from '@/lib/site/content'
import { homeMetadata, kitViewport } from '@/lib/site/metadata'

export const metadata = homeMetadata('ar')
export const viewport = kitViewport

export default function ArabicHome() {
  return (
    <>
      <AppJsonLd locale="ar" />
      <Home c={COPY.ar} />
    </>
  )
}
