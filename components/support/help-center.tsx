'use client'

import { useMemo, useState } from 'react'

type Faq = {
  q: string
  a: string
  category: 'Membership' | 'Tribes' | 'Events' | 'App' | 'Billing'
}

const FAQS: Faq[] = [
  {
    category: 'Membership',
    q: 'How do I request an invitation to APEX?',
    a: 'Access is by referral and review. Submit a request through the form below and a concierge will reach out to verify your profile. Most decisions are made within 72 hours.',
  },
  {
    category: 'Membership',
    q: 'What is the difference between the Initiate, Apex, and Obsidian tiers?',
    a: 'Initiate unlocks the community and city meets. Apex adds priority event access, track days, and partner rates. Obsidian is fully bespoke — private routes, closed-door reveals, and a dedicated concierge.',
  },
  {
    category: 'Billing',
    q: 'How is membership billed, and can I pause it?',
    a: 'Membership is billed annually in AED. You may pause once per year for up to 90 days with no penalty — your tier and standing are preserved while paused.',
  },
  {
    category: 'Tribes',
    q: 'Can I belong to more than one tribe?',
    a: 'Yes. Supercar, Moto, Karting, Offroad, and Community are not exclusive. Your home tribe simply sets your default feed and meet invitations.',
  },
  {
    category: 'Events',
    q: 'Are guests allowed at APEX drives and meets?',
    a: 'Apex and Obsidian members may bring one verified guest to most open meets. Closed reveals and track days are members-only for insurance reasons.',
  },
  {
    category: 'Events',
    q: 'What happens to a drive in poor weather?',
    a: 'Routes are re-timed, never cancelled lightly. You will be notified in-app at least four hours ahead, and Obsidian members receive a personal call.',
  },
  {
    category: 'App',
    q: 'Which devices does the APEX app support?',
    a: 'iOS 16+ and Android 12+. Universal links and app-to-app deep linking are enabled, so shared routes and invites open natively.',
  },
  {
    category: 'App',
    q: 'How do I recover account access if I lose my phone?',
    a: 'Use “Recover access” on the sign-in screen, or contact the concierge. Identity is re-verified against your membership record before a new device is trusted.',
  },
]

const CATEGORIES = ['All', 'Membership', 'Tribes', 'Events', 'App', 'Billing'] as const

export function HelpCenter() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All')
  const [open, setOpen] = useState<string | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FAQS.filter((f) => {
      const inCategory = category === 'All' || f.category === category
      const inQuery = !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
      return inCategory && inQuery
    })
  }, [query, category])

  return (
    <section id="help" className="bg-carbon px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="reveal text-[11px] font-semibold uppercase tracking-[0.5em] text-gold">
          Help Center
        </p>
        <h2 className="reveal mt-5 font-extrabold leading-[0.95] [font-size:clamp(2rem,6vw,3.5rem)]">
          Find your answer.
        </h2>

        {/* Search */}
        <div className="reveal mt-10">
          <label htmlFor="faq-search" className="sr-only">
            Search the help center
          </label>
          <div className="group flex items-center gap-4 border-b border-white/15 pb-4 transition-colors duration-500 focus-within:border-gold">
            <SearchIcon />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search membership, events, the app…"
              className="w-full bg-transparent text-lg text-white placeholder:text-white/30 focus:outline-none"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="reveal mt-8 flex flex-wrap gap-3">
          {CATEGORIES.map((c) => {
            const active = c === category
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`border px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] transition-colors duration-300 ${
                  active
                    ? 'border-gold bg-gold text-carbon'
                    : 'border-white/15 text-white/60 hover:border-white/40 hover:text-white'
                }`}
              >
                {c}
              </button>
            )
          })}
        </div>

        {/* Results */}
        <div className="reveal mt-12">
          {results.length === 0 ? (
            <p className="py-10 text-center text-sm uppercase tracking-[0.3em] text-white/40">
              No answers match. Try the concierge below.
            </p>
          ) : (
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {results.map((f) => {
                const isOpen = open === f.q
                return (
                  <li key={f.q}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : f.q)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-gold/70">
                          {f.category}
                        </span>
                        <span className="text-base font-medium text-white md:text-lg">
                          {f.q}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`shrink-0 text-2xl font-light text-white/50 transition-transform duration-500 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="grid transition-all duration-500 ease-out"
                      style={{
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-white/60">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="shrink-0 text-white/40"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  )
}
