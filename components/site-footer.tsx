const LEGAL = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Refunds', href: '/refunds' },
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
]

export function SiteFooter() {
  return (
    <footer className="bg-carbon px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
        <span className="text-white">APEX</span>
        <span aria-hidden="true" className="text-white/20">
          ·
        </span>
        <a href="/download" className="inline-flex min-h-11 items-center transition-colors duration-500 hover:text-white">
          Download
        </a>
        <a href="/concierge" className="inline-flex min-h-11 items-center transition-colors duration-500 hover:text-white">
          Contact
        </a>
        <span aria-hidden="true" className="text-white/20">
          ·
        </span>
        {LEGAL.map((l) => (
          <a key={l.href} href={l.href} className="inline-flex min-h-11 items-center transition-colors duration-500 hover:text-white">
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
