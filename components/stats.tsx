'use client'

import { useEffect, useRef, useState } from 'react'

type Stat = { value: number; suffix?: string; label: string }

const STATS: Stat[] = [
  { value: 350, suffix: '+', label: 'Routes' },
  { value: 7, label: 'Cities' },
  { value: 4, label: 'Tribes' },
  { value: 1, label: 'Community' },
]

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true
            const duration = 1600
            const start = performance.now()
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration)
              const eased = 1 - Math.pow(1 - p, 3)
              setN(Math.round(eased * target))
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        }
      },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="border-y border-white/5 px-6 py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-16 md:grid-cols-4 md:gap-y-0">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`reveal flex flex-col items-center text-center md:px-6 ${
              i > 0 ? 'md:border-l md:border-gold/25' : ''
            }`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <span className="font-extrabold leading-none text-gold [font-size:clamp(2.75rem,7vw,4.5rem)]">
              <Counter target={s.value} suffix={s.suffix} />
            </span>
            <span className="mt-5 text-[9px] uppercase tracking-[0.4em] text-white/80">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
