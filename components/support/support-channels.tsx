const CHANNELS = [
  {
    label: 'Concierge Line',
    value: '+971 4 000 0000',
    note: 'Daily · 08:00–24:00 GST',
    href: 'tel:+97140000000',
    icon: 'phone',
  },
  {
    label: 'Email Desk',
    value: 'concierge@apex.club',
    note: 'Replies within the hour',
    href: 'mailto:concierge@apex.club',
    icon: 'mail',
  },
  {
    label: 'In-App Chat',
    value: 'Open APEX → Help',
    note: 'Members · live agents',
    href: '/',
    icon: 'chat',
  },
] as const

export function SupportChannels() {
  return (
    <section className="bg-carbon-soft px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="reveal text-[11px] font-semibold uppercase tracking-[0.5em] text-gold">
          Reach Us
        </p>
        <h2 className="reveal mt-5 font-extrabold leading-[0.95] [font-size:clamp(2rem,6vw,3.5rem)]">
          Three ways in.
        </h2>

        <div className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="reveal group flex flex-col gap-6 bg-carbon p-8 transition-colors duration-500 hover:bg-carbon-soft md:p-10"
            >
              <span className="text-gold transition-transform duration-500 group-hover:-translate-y-1">
                <ChannelIcon name={c.icon} />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                  {c.label}
                </p>
                <p className="mt-3 text-xl font-medium text-white">{c.value}</p>
                <p className="mt-2 text-[13px] text-white/50">{c.note}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ChannelIcon({ name }: { name: 'phone' | 'mail' | 'chat' }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  if (name === 'phone') {
    return (
      <svg {...common}>
        <path d="M4 5c0 8.284 6.716 15 15 15a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-.79-.98l-3.2-.71a1 1 0 0 0-1 .42l-.74 1.06a11.5 11.5 0 0 1-5.34-5.34l1.06-.74a1 1 0 0 0 .42-1l-.71-3.2A1 1 0 0 0 9.5 3H7a2 2 0 0 0-2 2Z" />
      </svg>
    )
  }
  if (name === 'mail') {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="m3.5 6.5 8.5 6 8.5-6" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    </svg>
  )
}
