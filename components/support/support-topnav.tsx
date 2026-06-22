import Link from 'next/link'

export function SupportTopNav({ label = 'Concierge' }: { label?: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-carbon/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-[0.04em] text-white md:text-2xl"
          aria-label="APEX — home"
        >
          APEX
        </Link>
        <div className="flex items-center gap-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
          <span className="hidden text-gold sm:inline">{label}</span>
          <Link href="/" className="transition-colors duration-500 hover:text-white">
            Back to site
          </Link>
        </div>
      </nav>
    </header>
  )
}
