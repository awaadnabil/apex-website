'use client'

import { motion, useInView, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLang } from '@/lib/drive/i18n'
import { EASE } from '@/lib/drive/motion'
import { Phone } from './phone'

function ActBar({ progress, index, label }: { progress: MotionValue<number>; index: number; label: string }) {
  const fill = useTransform(progress, [index / 3, (index + 1) / 3], [0, 1])
  return (
    <li className="flex-1">
      <span className="block h-[2px] overflow-hidden rounded-full bg-ice/15">
        <motion.span className="block h-full origin-left rounded-full bg-amber rtl:origin-right" style={{ scaleX: fill }} />
      </span>
      <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-haze">
        {`0${index + 1}`} · {label}
      </span>
    </li>
  )
}

export function Story() {
  const { t, dir } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, { amount: 0.5 })
  const [act, setAct] = useState(0)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = v < 0.34 ? 0 : v < 0.67 ? 1 : 2
    setAct((prev) => (prev === next ? prev : next))
  })

  const dusk = useTransform(scrollYProgress, [0, 0.28, 0.48], [1, 1, 0])
  const night = useTransform(scrollYProgress, [0.22, 0.48, 0.74], [0, 1, 0])
  const sunrise = useTransform(scrollYProgress, [0.58, 0.82, 1], [0, 1, 1])
  const relive = useTransform(scrollYProgress, [0.68, 0.97], [0, 1], { clamp: true })

  const sign = dir === 'rtl' ? -1 : 1

  return (
    <section ref={sectionRef} id="how" aria-labelledby="how-title" className="relative h-[320svh]">
      <div ref={stageRef} className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ opacity: dusk, background: 'radial-gradient(60% 55% at 72% 58%, rgba(255,140,60,0.17), transparent 70%)' }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ opacity: night, background: 'radial-gradient(60% 55% at 70% 50%, rgba(70,110,190,0.16), transparent 70%)' }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ opacity: sunrise, background: 'radial-gradient(65% 55% at 68% 35%, rgba(255,200,100,0.17), transparent 70%)' }}
        />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-8 md:grid-cols-2 md:gap-16">
          <div>
            <h2 id="how-title" className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
              {t.story.eyebrow}
            </h2>
            <ol className="mt-6 flex gap-3" aria-hidden="true">
              {t.story.acts.map((a, i) => (
                <ActBar key={a.key} progress={scrollYProgress} index={i} label={a.key} />
              ))}
            </ol>

            <div className="mt-8 grid md:mt-12">
              {t.story.acts.map((a, i) => (
                <motion.div
                  key={a.key}
                  className="[grid-area:1/1]"
                  initial={false}
                  animate={{ opacity: act === i ? 1 : 0, x: act === i ? 0 : (i < act ? -28 : 28) * sign }}
                  transition={{ duration: 0.7, ease: EASE }}
                  aria-hidden={act !== i}
                >
                  <h3 className="text-balance font-display leading-tight text-bone [font-size:clamp(1.5rem,3.6vw,2.6rem)]">
                    {a.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-pretty text-base leading-relaxed text-haze">{a.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <Phone act={act} inView={inView} relive={relive} />
        </div>
      </div>
    </section>
  )
}
