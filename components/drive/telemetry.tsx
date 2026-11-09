'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/drive/i18n'
import { EASE, INTRO_DELAY } from '@/lib/drive/motion'
import { driveState, elevationMeters, ROUTE_KM } from '@/lib/drive/terrain'

export function Telemetry({ tiltSlot }: { tiltSlot?: React.ReactNode }) {
  const { t } = useLang()
  const distRef = useRef<HTMLSpanElement>(null)
  const elevRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let raf = 0
    let lastDist = ''
    let lastElev = ''
    const loop = () => {
      const p = driveState.progress
      const dist = (ROUTE_KM * p).toFixed(1)
      const elev = Math.round(p > 0 ? elevationMeters(driveState.headY) : 210).toLocaleString('en-US')
      if (dist !== lastDist && distRef.current) distRef.current.textContent = lastDist = dist
      if (elev !== lastElev && elevRef.current) elevRef.current.textContent = lastElev = elev
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const item = 'flex items-baseline gap-2'
  const label = 'text-haze'
  const value = 'text-bone tabular-nums'

  return (
    <motion.dl
      aria-label={t.telemetry.label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: EASE, delay: INTRO_DELAY + 0.5 }}
      className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em]"
    >
      <div className={item}>
        <dt className={label}>{t.telemetry.route}</dt>
        <dd className={value}>{t.telemetry.routeValue}</dd>
      </div>
      <div className={item}>
        <dt className={label}>{t.telemetry.dist}</dt>
        <dd className={value} dir="ltr">
          <span ref={distRef}>0.0</span> {t.telemetry.km}
        </dd>
      </div>
      <div className={item}>
        <dt className={label}>{t.telemetry.elev}</dt>
        <dd className={value} dir="ltr">
          <span ref={elevRef}>210</span> {t.telemetry.m}
        </dd>
      </div>
      <div className={item}>
        <dt className={label}>{t.telemetry.cars}</dt>
        <dd className="text-amber tabular-nums">6</dd>
      </div>
      {tiltSlot}
    </motion.dl>
  )
}
