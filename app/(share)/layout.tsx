// The English share pages: /dealer/[id] and /club/[id]. Their own root layout so they can take the kit's
// lean shell (components/site/kit-document.tsx) while /, /pricing and /refunds keep the full one.
import { KitDocument } from '@/components/site/kit-document'

export default function ShareLayout({ children }: { children: React.ReactNode }) {
  return (
    <KitDocument locale="en" lean>
      {children}
    </KitDocument>
  )
}
