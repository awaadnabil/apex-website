'use client'

import { motion, useInView, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { contourPaths } from '@/lib/drive/contours'
import { useLang } from '@/lib/drive/i18n'
import { Wordmark } from './top-bar'

const CARD_LINES = contourPaths(400, 252, 9, 4.2)

type Pass = {
  brand: string
  club: string
  member: string
  fan: { rotate: number; x: number; y: number }
  front?: boolean
}

const PASSES: Pass[] = [
  { brand: 'APEX · CLUB', club: 'HAJAR LINE', member: 'MEMBER 0118 · RAK · 2026', fan: { rotate: -11, x: -17, y: 7 } },
  { brand: 'APEX · CLUB', club: 'LIWA SANDS', member: 'MEMBER 0307 · AUH · 2026', fan: { rotate: 9, x: 16, y: 3 } },
  { brand: 'APEX · INNER CIRCLE', club: 'DESERT RUNNERS', member: 'MEMBER 0042 · DXB · 2026', fan: { rotate: -2, x: 0, y: 0 }, front: true },
]

function PassFace({ pass }: { pass: Pass }) {
  return (
    <div
      dir="ltr"
      className="relative size-full overflow-hidden rounded-[18px] border border-ice/15 bg-dune p-[6%] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)]"
    >
      <svg aria-hidden="true" viewBox="0 0 400 252" preserveAspectRatio="none" className="absolute inset-0 size-full">
        {CARD_LINES.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#cfe3ff" strokeOpacity={pass.front ? 0.09 : 0.06} strokeWidth="0.8" />
        ))}
      </svg>
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-[clamp(8px,2vw,11px)] tracking-[0.22em] text-amber">{pass.brand}</span>
          <Wordmark className="text-[clamp(9px,2.2vw,12px)] text-bone" />
        </div>
        <div>
          <span aria-hidden="true" className="block aspect-[1.3/1] w-[13%] rounded-[5px] border border-amber/40 bg-amber/70" />
          <p className="mt-[5%] font-display tracking-[0.08em] text-bone [font-size:clamp(14px,4.2vw,24px)]">{pass.club}</p>
          <p className="mt-[2.5%] font-mono tracking-[0.2em] text-haze [font-size:clamp(8px,2vw,11px)]">{pass.member}</p>
        </div>
      </div>
      {pass.front ? <div className="foil" aria-hidden="true" /> : null}
    </div>
  )
}

export function Clubs() {
  const { t, dir } = useLang()
  const reduced = useReducedMotion()
  const stackRef = useRef<HTMLDivElement>(null)
  const frontRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stackRef, { once: true, amount: 0.45 })
  const spring = { stiffness: 150, damping: 16 }
  const rotateX = useSpring(0, spring)
  const rotateY = useSpring(0, spring)
  const sign = dir === 'rtl' ? -1 : 1

  return (
    <section id="clubs" aria-labelledby="clubs-title" className="relative overflow-hidden px-4 py-28 sm:px-8 md:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">{t.clubs.eyebrow}</p>
          <h2 id="clubs-title" className="mt-4 text-balance font-display leading-tight text-bone [font-size:clamp(1.5rem,3.6vw,2.6rem)]">
            {t.clubs.title}
          </h2>
          <p className="mt-5 max-w-[46ch] text-pretty text-base leading-relaxed text-haze">{t.clubs.body}</p>
          <Link
            href="/membership"
            className="mt-8 inline-flex h-12 items-center gap-3 rounded-full border border-ice/20 bg-ice/5 px-6 text-sm font-semibold text-bone transition-colors duration-300 hover:border-ice/35 hover:bg-ice/10"
          >
            {t.clubs.cta}
            <ArrowRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
          </Link>
        </div>

        <div
          ref={stackRef}
          role="img"
          aria-label={t.clubs.stackLabel}
          className="relative mx-auto aspect-[1.586/1] w-[min(360px,66vw)] touch-pan-y md:w-[min(380px,32vw)]"
          style={{ perspective: 1000 }}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            const px = (e.clientX - r.left) / r.width
            const py = (e.clientY - r.top) / r.height
            frontRef.current?.style.setProperty('--fx', `${px * 100}%`)
            frontRef.current?.style.setProperty('--fy', `${py * 100}%`)
            if (reduced) return
            rotateY.set((px - 0.5) * 36)
            rotateX.set(-(py - 0.5) * 36)
          }}
          onPointerLeave={() => {
            rotateX.set(0)
            rotateY.set(0)
          }}
        >
          {PASSES.map((pass, i) => (
            <motion.div
              key={pass.club}
              className="absolute inset-0"
              style={{ zIndex: i }}
              initial={{ rotate: 0, x: '0%', y: '0%' }}
              animate={
                inView
                  ? { rotate: pass.fan.rotate * sign, x: `${pass.fan.x * sign}%`, y: `${pass.fan.y}%` }
                  : { rotate: 0, x: '0%', y: '0%' }
              }
              transition={{ type: 'spring', stiffness: 110, damping: 15, delay: 0.1 + i * 0.08 }}
            >
              {pass.front ? (
                <motion.div ref={frontRef} className="size-full" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
                  <PassFace pass={pass} />
                </motion.div>
              ) : (
                <PassFace pass={pass} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
