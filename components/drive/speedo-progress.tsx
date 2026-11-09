'use client'

import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'

function polar(deg: number, r: number) {
  const a = ((deg - 90) * Math.PI) / 180
  return [50 + r * Math.cos(a), 50 + r * Math.sin(a)] as const
}

const START = -120
const END = 120
const [sx, sy] = polar(START, 40)
const [ex, ey] = polar(END, 40)
const ARC = `M ${sx.toFixed(2)} ${sy.toFixed(2)} A 40 40 0 1 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`
const TICKS = Array.from({ length: 9 }, (_, i) => {
  const deg = START + (i * (END - START)) / 8
  const [x1, y1] = polar(deg, 31)
  const [x2, y2] = polar(deg, 35)
  return { x1, y1, x2, y2 }
})

export function SpeedoProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  const readout = useRef<SVGTextElement>(null)

  useMotionValueEvent(progress, 'change', (v) => {
    if (readout.current) readout.current.textContent = String(Math.round(v * 280)).padStart(3, '0')
  })

  return (
    <div
      aria-hidden="true"
      dir="ltr"
      className="pointer-events-none fixed bottom-4 end-4 z-40 size-16 sm:bottom-6 sm:end-6 sm:size-[72px]"
    >
      <svg viewBox="0 0 100 100" className="size-full">
        <circle cx="50" cy="50" r="47" fill="rgba(5,7,12,0.65)" stroke="rgba(207,227,255,0.12)" />
        <path d={ARC} fill="none" stroke="rgba(207,227,255,0.14)" strokeWidth="4" strokeLinecap="round" />
        <motion.path
          d={ARC}
          fill="none"
          stroke="#ffb547"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ pathLength: progress, filter: 'drop-shadow(0 0 4px rgba(255,181,71,0.7))' }}
        />
        {TICKS.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="rgba(207,227,255,0.35)" strokeWidth="1.2" />
        ))}
        <text ref={readout} x="50" y="55" textAnchor="middle" className="fill-bone font-mono" fontSize="17">
          000
        </text>
        <text x="50" y="70" textAnchor="middle" className="fill-haze font-mono" fontSize="8" letterSpacing="1">
          KM/H
        </text>
      </svg>
    </div>
  )
}
