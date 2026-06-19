const TIERS = [
  {
    name: 'Ignite',
    price: 'AED 49.99',
    period: '/mo',
    border: 'border-l-teal',
    hover: 'hover:bg-teal/[0.04]',
    features: ['Community access', 'Local meets', '50 saved routes', 'Event calendar'],
  },
  {
    name: 'Carbon',
    price: 'AED 149.99',
    period: '/mo',
    border: 'border-l-gold',
    hover: 'hover:bg-gold/[0.05]',
    recommended: true,
    features: ['Everything in Ignite', 'All 350+ routes', 'Track day priority', 'Tribe leadership'],
  },
  {
    name: 'Obsidian',
    price: 'By Invitation',
    period: '',
    border: 'border-l-silver',
    hover: 'hover:bg-white/[0.03]',
    redacted: true,
  },
]

function Lock() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" stroke="#8a8a8a" strokeWidth="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="#8a8a8a" strokeWidth="1.5" />
    </svg>
  )
}

export function Membership() {
  return (
    <section id="membership" className="px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <h2 className="reveal mb-20 text-center font-extrabold leading-none text-white [font-size:clamp(2rem,5vw,3rem)]">
          Choose Your Access
        </h2>

        <div className="flex flex-col">
          {TIERS.map((t, i) => (
            <div
              key={t.name}
              className={`reveal group flex flex-col gap-6 border-b border-white/8 border-l-2 px-6 py-10 transition-colors duration-500 md:flex-row md:items-center md:gap-10 md:px-12 ${t.border} ${t.hover} ${i === 0 ? 'border-t border-white/8' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex min-w-[260px] items-center gap-4">
                <h3 className="font-extrabold uppercase tracking-[0.15em] text-white [font-size:clamp(1.5rem,3vw,2rem)]">
                  {t.name}
                </h3>
                {t.recommended && (
                  <span className="border border-gold px-2 py-1 text-[8px] uppercase tracking-[0.3em] text-gold">
                    Recommended
                  </span>
                )}
              </div>

              <div className="min-w-[180px]">
                <span className="text-lg font-bold text-white">{t.price}</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                  {t.period}
                </span>
              </div>

              <div className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-3">
                {t.redacted ? (
                  <div className="flex flex-wrap items-center gap-4">
                    {[88, 64, 104].map((w, idx) => (
                      <span
                        key={idx}
                        className="flex h-3 items-center bg-white/15"
                        style={{ width: w }}
                        aria-hidden="true"
                      />
                    ))}
                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-silver">
                      <Lock /> Classified
                    </span>
                  </div>
                ) : (
                  t.features?.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] uppercase tracking-[0.2em] text-white/70"
                    >
                      {f}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
