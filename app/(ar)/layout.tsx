import { KitDocument } from '@/components/site/kit-document'

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return <KitDocument locale="ar">{children}</KitDocument>
}
