import Link from 'next/link'
import { COMMUNITY_TILE, TRIBES } from '@/lib/site'

type Tile = { name: string; card: string; img: string; alt: string; href?: string }

const TILES: Tile[] = [
  ...TRIBES.map((t) => ({ name: t.name, card: t.card, img: t.img, alt: t.alt, href: `/tribes/${t.slug}` })),
  { ...COMMUNITY_TILE, href: '/concierge' },
]

const tileClass =
  'group reveal relative block h-[300px] overflow-hidden md:h-full md:flex-1 md:transition-[flex-grow] md:duration-700 md:ease-[cubic-bezier(0.16,1,0.3,1)] md:hover:grow-[2.6]'

export function Tribes() {
  return (
    <section id="tribes" className="scroll-mt-20 px-6 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <h2 className="reveal mb-16 text-left font-extrabold leading-none text-white [font-size:clamp(2.5rem,6vw,4rem)]">
          The Tribes
        </h2>

        <div className="flex flex-col gap-3 md:h-[78vh] md:flex-row md:gap-2">
          {TILES.map((t, i) => (
            <Link
              key={t.name}
              href={t.href ?? '#'}
              aria-label={`${t.name} — ${t.card}`}
              className={tileClass}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img
                src={t.img}
                alt={t.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover brightness-[0.4] grayscale-[0.3] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-90 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-carbon/40 transition-opacity duration-700 group-hover:opacity-20" />

              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-extrabold uppercase tracking-[0.2em] text-white [font-size:clamp(1.25rem,2.4vw,1.75rem)] md:[writing-mode:vertical-rl] md:rotate-180 md:self-start md:transition-all md:duration-700 md:group-hover:[writing-mode:horizontal-tb] md:group-hover:rotate-0">
                  {t.name}
                </h3>
                <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-gold opacity-100 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100">
                  {t.card}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
