export function SupportChannels() {
  return (
    <section className="bg-carbon-soft px-6 py-24 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="reveal text-[11px] font-semibold uppercase tracking-[0.5em] text-gold">
          Reach Us
        </p>
        <h2 className="reveal mt-5 font-extrabold leading-[0.95] [font-size:clamp(2rem,6vw,3.5rem)]">
          One desk. One inbox.
        </h2>
        <p className="reveal mt-6 max-w-xl text-pretty leading-relaxed text-white/60">
          Every request reaches the same concierge team. Write to us directly and a member of the
          desk will respond, usually within the hour.
        </p>

        <a
          href="mailto:support@getapexmena.com"
          className="reveal group mt-12 flex flex-col gap-8 border border-white/12 bg-carbon p-8 transition-colors duration-500 hover:border-gold/50 md:flex-row md:items-center md:justify-between md:p-12"
        >
          <span className="flex min-w-0 items-center gap-5">
            <span className="shrink-0 text-gold">
              <svg
                width={28}
                height={28}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="1.5" />
                <path d="m3.5 6.5 8.5 6 8.5-6" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                Email the concierge
              </span>
              <span className="mt-3 block break-all font-extrabold text-white [font-size:clamp(1.1rem,5vw,1.875rem)]">
                support@getapexmena.com
              </span>
            </span>
          </span>
          <span
            aria-hidden="true"
            className="text-2xl text-gold transition-transform duration-500 group-hover:translate-x-2"
          >
            &rarr;
          </span>
        </a>
      </div>
    </section>
  )
}
