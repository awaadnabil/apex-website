export function SiteFooter() {
  return (
    <footer className="bg-carbon px-6 py-16">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
        <span className="text-white">APEX</span>
        <span aria-hidden="true" className="text-white/20">
          ·
        </span>
        <a href="#" className="transition-colors duration-500 hover:text-white">
          Privacy
        </a>
        <span aria-hidden="true" className="text-white/20">
          ·
        </span>
        <a href="#" className="transition-colors duration-500 hover:text-white">
          Contact
        </a>
      </div>
    </footer>
  )
}
