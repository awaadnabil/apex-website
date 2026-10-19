import Link from 'next/link'
import { FAQ, TRIBES } from '@/lib/site'
import { JsonLd } from '@/components/json-ld'

/**
 * The page's crawlable substance. Restrained to match the brand — one statement,
 * a quiet question list — but real text, so search engines and AI answers know
 * what APEX is, where it runs and how to join.
 */
export function AboutFaq() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section className="border-t border-white/5 px-6 py-28 md:py-40">
      <JsonLd data={faqLd} />
      <div className="mx-auto grid max-w-6xl gap-20 md:grid-cols-[1fr_1.4fr] md:gap-24">
        <div>
          <p className="reveal text-[11px] font-semibold uppercase tracking-[0.5em] text-teal">
            The collective
          </p>
          <h2 className="reveal mt-6 text-balance font-extrabold leading-[0.95] text-white [font-size:clamp(2rem,4.5vw,3.25rem)]">
            The car and motorcycle community of the GCC.
          </h2>
          <p className="reveal mt-8 max-w-md text-[15px] leading-relaxed text-white/55">
            Supercar drives, superbike rides, karting nights and offroad trips across the UAE and
            Oman — organised, tracked live and kept safe inside one app.
          </p>
          <nav aria-label="Tribes" className="reveal mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {TRIBES.map((t) => (
              <Link
                key={t.slug}
                href={`/tribes/${t.slug}`}
                className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 transition-colors duration-500 hover:text-white"
              >
                {t.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQ.map((f) => (
            <details key={f.q} className="reveal group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <h3 className="text-[15px] font-semibold text-white md:text-base">{f.q}</h3>
                <span
                  aria-hidden="true"
                  className="text-white/40 transition-transform duration-500 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/55">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
