import { AppJsonLd } from '@/components/seo/app-jsonld'
import { Home } from '@/components/site/home'
import { COPY } from '@/lib/site/content'
import { homeMetadata, kitViewport } from '@/lib/site/metadata'

export const metadata = homeMetadata('en')
export const viewport = kitViewport

export default function Page() {
  return (
    <>
      <AppJsonLd locale="en" />
      <Home c={COPY.en} />
    </>
  )
}
