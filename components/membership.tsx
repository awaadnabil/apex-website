import { ApexButton } from './apex-button'

const TIERS = [
  {
    no: '01',
    name: 'Ignite',
    price: 'AED 49.99',
    period: '/mo',
    features: ['Community access', 'Local meets', '50 saved routes', 'Event calendar'],
  },
  {
    no: '02',
    name: 'Carbon',
    price: 'AED 149.99',
    period: '/mo',
    cta: true,
    features: ['Everything in Ignite', 'All 350+ routes', 'Track day priority', 'Tribe leadership'],
  },
  {
    no: '03',
    name: 'Obsidian',
    price: 'By Invitation',
    period: '',
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
    <section id="membership" className="px-6 pb-32 pt-12 md:pb-48 md:pt-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="reveal mb-16 text-left font-extrabold leading-none text-white [font-size:clamp(2.5rem,6vw,4rem)] md:mb-24">
          Your Access
        </h2>

        <div className="flex flex-col">
          {TIERS.map((t, i) => (
            <div
              key={t.name}
              className={`reveal flex flex-col gap-8 border-b border-white/10 py-14 md:flex-row md:items-center md:gap-12 ${
                i === 0 ? 'border-t border-white/10' : ''
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Tier number — teal lives here and nowhere else */}
              <span
                className={`font-extrabold leading-none [font-size:clamp(2rem,4vw,3rem)] ${
                  t.no === '01' ? 'text-teal' : 'text-white/20'
                }`}
              >
                {t.no}
              </span>

              <div className="min-w-[200px]">
                <h3 className="font-extrabold uppercase tracking-[0.15em] text-white [font-size:clamp(1.5rem,3vw,2rem)]">
                  {t.name}
                </h3>
              </div>

              <div className="min-w-[180px]">
                <span className="text-lg font-bold text-gold">{t.price}</span>
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

              {/* The single filled button on the page */}
              {t.cta && (
                <div className="md:ml-auto">
                  <ApexButton href="#top" variant="solid">
                    Get Carbon
                  </ApexButton>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
