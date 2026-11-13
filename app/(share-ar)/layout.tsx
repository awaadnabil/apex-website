// The Arabic share pages: /ar/dealer/[id] and /ar/club/[id], the lean kit shell in true RTL.
import { KitDocument } from '@/components/site/kit-document'
import { plexAr } from '@/lib/site/fonts-ar'

export default function ArabicShareLayout({ children }: { children: React.ReactNode }) {
  return (
    <KitDocument locale="ar" extraFontClass={plexAr.variable} lean>
      {children}
    </KitDocument>
  )
}
