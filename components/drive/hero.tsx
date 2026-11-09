'use client'

import { useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/drive/i18n'
import { driveState } from '@/lib/drive/terrain'
import { GlassCard } from './glass-card'
import { Telemetry } from './telemetry'

const TerrainScene = dynamic(() => import('./terrain-scene'), { ssr: false })

type OrientationCtor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

function clamp(v: number) {
  return Math.max(-1, Math.min(1, v))
}

function listenToTilt() {
  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma == null || e.beta == null) return
    driveState.tiltActive = true
    driveState.tiltX = clamp(e.gamma / 30)
    driveState.tiltY = clamp((45 - e.beta) / 30)
  })
}

export function Hero() {
  const { t } = useLang()
  const reduced = Boolean(useReducedMotion())
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(true)
  const [needsTiltPermission, setNeedsTiltPermission] = useState(false)

  // Mount the WebGL canvas only after the first paint.
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 60)
    return () => window.clearTimeout(id)
  }, [])

  // Pause rendering while the hero is off-screen.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: '80px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      driveState.pointerX = (e.clientX / window.innerWidth) * 2 - 1
      driveState.pointerY = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: coarse)').matches) return
    const Ctor = window.DeviceOrientationEvent as OrientationCtor | undefined
    if (!Ctor) return
    if (typeof Ctor.requestPermission === 'function') setNeedsTiltPermission(true)
    else listenToTilt()
  }, [reduced])

  const requestTilt = async () => {
    const Ctor = window.DeviceOrientationEvent as OrientationCtor
    try {
      if ((await Ctor.requestPermission?.()) === 'granted') listenToTilt()
    } finally {
      setNeedsTiltPermission(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex w-full flex-col justify-end overflow-hidden bg-night"
      style={{ minHeight: 'min(820px, 100svh)' }}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {mounted ? <TerrainScene reduced={reduced} active={active} /> : null}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-night via-night/40 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-28 sm:px-8 md:pb-12">
        <GlassCard />
        <Telemetry
          tiltSlot={
            needsTiltPermission ? (
              <div>
                <button
                  type="button"
                  onClick={requestTilt}
                  className="rounded-full border border-amber/40 px-3 py-1 text-amber transition-colors hover:bg-amber/10"
                >
                  {t.hero.tilt}
                </button>
              </div>
            ) : null
          }
        />
      </div>
    </section>
  )
}
