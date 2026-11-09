'use client'

import { motion, useMotionValueEvent, useReducedMotion, type MotionValue } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { contourPaths } from '@/lib/drive/contours'
import { useLang } from '@/lib/drive/i18n'
import { EASE } from '@/lib/drive/motion'
import { ROUTE_KM } from '@/lib/drive/terrain'

const MAP_LINES = contourPaths(300, 640, 18, 1.3)
const PINS = [
  [78, 196],
  [212, 150],
  [150, 300],
  [238, 392],
  [72, 440],
] as const
const CONVOY_PATH = 'M40 600 C 60 500, 230 480, 205 380 S 60 290, 110 200 S 250 120, 240 40'
const RELIVE_PATH = 'M50 590 C 100 520, 240 520, 212 420 S 64 330, 92 250 S 236 170, 222 60'
const REPLAY_SECONDS = 222

function MapBase() {
  return (
    <g>
      {MAP_LINES.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#cfe3ff"
          strokeOpacity={i % 5 === 0 ? 0.16 : 0.07}
          strokeWidth={i % 5 === 0 ? 1.1 : 0.7}
        />
      ))}
    </g>
  )
}

function Screen({ visible, children }: { visible: boolean; children: ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      aria-hidden={!visible}
    >
      {children}
    </motion.div>
  )
}

const mapSvg = 'absolute inset-0 size-full'

function FindScreen({ active }: { active: boolean }) {
  const { t } = useLang()
  return (
    <>
      <svg viewBox="0 0 300 640" preserveAspectRatio="xMidYMid slice" className={mapSvg}>
        <MapBase />
        {PINS.map(([x, y], i) => (
          <motion.g
            key={i}
            initial={{ y: -70, opacity: 0 }}
            animate={active ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
            transition={
              active
                ? { type: 'spring', stiffness: 420, damping: 11, delay: 0.15 + i * 0.11 }
                : { duration: 0.2 }
            }
          >
            <g transform={`translate(${x} ${y})`}>
              {i === 2 ? <circle r="18" fill="#ffb547" opacity="0.16" /> : null}
              <path
                d="M0 0 C -9 -12 -9 -25 0 -25 C 9 -25 9 -12 0 0 Z"
                fill={i === 2 ? '#ffb547' : '#cfe3ff'}
                fillOpacity={i === 2 ? 1 : 0.8}
              />
              <circle cy="-15.5" r="3.2" fill="#05070c" />
            </g>
          </motion.g>
        ))}
      </svg>
      <div className="absolute inset-x-5 top-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-haze">{t.phone.nearYou}</p>
        <p className="mt-1 font-display text-[13px] text-bone">Jebel Jais</p>
      </div>
      <div className="absolute inset-x-3 bottom-3 rounded-[20px] border border-ice/10 bg-dune/90 p-4 backdrop-blur">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">{t.phone.tonight}</p>
        <p className="mt-1.5 font-display text-[12px] text-bone">{t.phone.climb}</p>
        <p className="mt-1 text-[11px] text-haze">{t.phone.climbMeta}</p>
      </div>
    </>
  )
}

function ConvoyScreen({ active }: { active: boolean }) {
  const { t } = useLang()
  const reduced = useReducedMotion()
  const moving = active && !reduced

  return (
    <>
      <svg viewBox="0 0 300 640" preserveAspectRatio="xMidYMid slice" className={mapSvg}>
        <defs>
          <linearGradient id="convoy-streak" x1="0" x2="1">
            <stop offset="0" stopColor="#ffb547" stopOpacity="0" />
            <stop offset="1" stopColor="#ffb547" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <MapBase />
        <path id="convoy-route" d={CONVOY_PATH} fill="none" stroke="#ffb547" strokeOpacity="0.2" strokeWidth="7" strokeLinecap="round" />
        <path d={CONVOY_PATH} fill="none" stroke="#ffd27a" strokeOpacity="0.7" strokeWidth="1.4" strokeDasharray="2 6" />
        {[0, 1, 2].map((i) => {
          const parked = (0.62 - i * 0.07).toFixed(2)
          return (
            <g key={`${i}-${moving}`}>
              <rect x="-36" y="-1.6" width="36" height="3.2" rx="1.6" fill="url(#convoy-streak)" />
              <circle r={i === 0 ? 6 : 4.8} fill={i === 0 ? '#ffb547' : '#cfe3ff'} stroke="#05070c" strokeWidth="1.5" />
              {moving ? (
                <animateMotion dur="8s" repeatCount="indefinite" rotate="auto" begin={`${-1.2 + i * 0.6}s`}>
                  <mpath href="#convoy-route" />
                </animateMotion>
              ) : (
                <animateMotion dur="0.001s" fill="freeze" rotate="auto" calcMode="linear" keyTimes="0;1" keyPoints={`${parked};${parked}`}>
                  <mpath href="#convoy-route" />
                </animateMotion>
              )}
            </g>
          )
        })}
      </svg>
      <div className="absolute inset-x-4 top-12 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em]">
        <span className="rounded-full bg-amber px-2.5 py-1 text-night">{t.phone.lead} · Saeed</span>
        <span className="rounded-full border border-ice/15 bg-dune/80 px-2.5 py-1 text-bone">{t.phone.gap} 120 m</span>
        <span className="rounded-full border border-ice/15 bg-dune/80 px-2.5 py-1 text-bone">6 {t.phone.cars}</span>
      </div>
    </>
  )
}

function ReliveScreen({ relive }: { relive: MotionValue<number> }) {
  const { t } = useLang()
  const pathRef = useRef<SVGPathElement>(null)
  const headRef = useRef<SVGGElement>(null)
  const timeRef = useRef<HTMLSpanElement>(null)
  const kmRef = useRef<HTMLSpanElement>(null)
  const length = useRef(0)

  const update = (v: number) => {
    const path = pathRef.current
    if (!path) return
    if (!length.current) length.current = path.getTotalLength()
    const pt = path.getPointAtLength(v * length.current)
    headRef.current?.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`)
    const secs = Math.round(v * REPLAY_SECONDS)
    if (timeRef.current) timeRef.current.textContent = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`
    if (kmRef.current) kmRef.current.textContent = (v * ROUTE_KM).toFixed(1)
  }

  useEffect(() => update(relive.get()))
  useMotionValueEvent(relive, 'change', update)

  return (
    <>
      <svg viewBox="0 0 300 640" preserveAspectRatio="xMidYMid slice" className={mapSvg}>
        <MapBase />
        <path ref={pathRef} d={RELIVE_PATH} fill="none" stroke="#cfe3ff" strokeOpacity="0.16" strokeWidth="2" strokeLinecap="round" />
        <motion.path d={RELIVE_PATH} fill="none" stroke="#ff9a2e" strokeOpacity="0.35" strokeWidth="9" strokeLinecap="round" style={{ pathLength: relive }} />
        <motion.path d={RELIVE_PATH} fill="none" stroke="#ffd27a" strokeWidth="2.4" strokeLinecap="round" style={{ pathLength: relive }} />
        <g ref={headRef}>
          <circle r="13" fill="#ffb547" opacity="0.2" />
          <circle r="5" fill="#fff1d6" />
        </g>
      </svg>
      <div className="absolute inset-x-3 bottom-3 rounded-[20px] border border-ice/10 bg-dune/90 p-4 backdrop-blur">
        <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
          <span className="text-amber">{t.phone.replay}</span>
          <span className="tabular-nums text-bone">
            <span ref={timeRef}>00:00</span> / 03:42
          </span>
        </div>
        <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-ice/15">
          <motion.div className="h-full origin-left rounded-full bg-amber" style={{ scaleX: relive }} />
        </div>
        <p className="mt-3 font-mono text-[11px] tabular-nums text-haze">
          <span ref={kmRef}>0.0</span> / {ROUTE_KM} km · RAK-E311
        </p>
      </div>
    </>
  )
}

export function Phone({ act, inView, relive }: { act: number; inView: boolean; relive: MotionValue<number> }) {
  return (
    <div
      dir="ltr"
      className="relative mx-auto aspect-[9/19.5] h-[min(500px,54svh)] rounded-[44px] border border-ice/15 bg-dune p-2.5 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)] md:h-[min(620px,78svh)]"
    >
      <div className="relative size-full overflow-hidden rounded-[36px] bg-night">
        <Screen visible={act === 0}>
          <FindScreen active={act === 0 && inView} />
        </Screen>
        <Screen visible={act === 1}>
          <ConvoyScreen active={act === 1 && inView} />
        </Screen>
        <Screen visible={act === 2}>
          <ReliveScreen relive={relive} />
        </Screen>
        <div className="absolute inset-x-0 top-0 flex h-9 items-center justify-between px-6 font-mono text-[10px] text-bone">
          <span>02:14</span>
          <span className="h-5 w-20 rounded-full bg-night" aria-hidden="true" />
          <span className="text-amber">APEX</span>
        </div>
      </div>
    </div>
  )
}
