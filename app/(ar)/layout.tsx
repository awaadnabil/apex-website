import { KitDocument } from '@/components/site/kit-document'
import { plexAr } from '@/lib/site/fonts-ar'

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <KitDocument locale="ar" extraFontClass={plexAr.variable}>
      {children}
    </KitDocument>
  )
}
