'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { useLang } from '@/lib/drive/i18n'
import { EASE } from '@/lib/drive/motion'

const REEL = Array.from({ length: 20 }, (_, i) => i % 10)

function Reel({ digit, delay, play }: { digit: number; delay: number; play: boolean }) {
  const reduced = useReducedMotion()
  // 20 stacked digits; each is 5% of the strip. Landing on the second copy = one full roll.
  const target = `-${(digit + 10) * 5}%`
  return (
    <span className="relative inline-block h-[1em] overflow-hidden text-center" style={{ width: '1ch' }}>
      <motion.span
        className="flex flex-col"
        initial={{ y: reduced ? target : '0%' }}
        animate={{ y: play || reduced ? target : '0%' }}
        transition={{ duration: reduced ? 0 : 1.7, ease: EASE, delay }}
      >
        {REEL.map((d, i) => (
          <span key={i} className="block h-[1em] leading-none">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

function Odometer({ value, play, offset }: { value: string; play: boolean; offset: number }) {
  let digitIndex = 0
  return (
    <span aria-hidden="true" dir="ltr" className="inline-flex items-start leading-none">
      {[...value].map((ch, i) => {
        if (!/\d/.test(ch)) {
          return (
            <span key={i} className="inline-block h-[1em] leading-none text-haze">
              {ch}
            </span>
          )
        }
        const delay = offset + digitIndex++ * 0.09
        return <Reel key={i} digit={Number(ch)} delay={delay} play={play} />
      })}
    </span>
  )
}

export function Numbers() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const play = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section aria-labelledby="numbers-title" className="relative px-4 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">{t.numbers.eyebrow}</p>
        <h2 id="numbers-title" className="mt-4 max-w-[22ch] text-balance font-display leading-tight text-bone [font-size:clamp(1.5rem,3.6vw,2.6rem)]">
          {t.numbers.title}
        </h2>

        <div ref={ref} className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {t.numbers.items.map((item, k) => (
            <div key={item.label} className="border-t border-ice/10 pt-6">
              <p className="font-display text-bone [font-size:clamp(2.4rem,11vw,4rem)] md:[font-size:clamp(2rem,4.3vw,4.4rem)]">
                <span className="sr-only">{item.value}</span>
                <Odometer value={item.value} play={play} offset={k * 0.18} />
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-haze">
                {item.label}
                <span aria-hidden="true" className="text-amber">
                  {' *'}
                </span>
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 font-mono text-[11px] text-haze">
          <span aria-hidden="true" className="text-amber">
            {'* '}
          </span>
          {t.numbers.note}
        </p>
      </div>
    </section>
  )
}
