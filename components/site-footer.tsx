import Link from 'next/link'
import { TRIBES } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="bg-carbon px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
        <nav aria-label="Tribes" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {TRIBES.map((t) => (
            <Link
              key={t.slug}
              href={`/tribes/${t.slug}`}
              className="transition-colors duration-500 hover:text-white"
            >
              {t.name}
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/" className="text-white">
            APEX
          </Link>
          <span aria-hidden="true" className="text-white/20">
            ·
          </span>
          <Link href="/download" className="transition-colors duration-500 hover:text-white">
            Download
          </Link>
          <Link href="/privacy" className="transition-colors duration-500 hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors duration-500 hover:text-white">
            Terms
          </Link>
          <span aria-hidden="true" className="text-white/20">
            ·
          </span>
          <Link href="/concierge" className="transition-colors duration-500 hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
