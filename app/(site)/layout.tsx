import { KitDocument } from '@/components/site/kit-document'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <KitDocument locale="en">{children}</KitDocument>
}
