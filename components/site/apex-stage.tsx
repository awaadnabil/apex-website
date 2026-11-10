'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import type { StageSignals } from './hero-scene'

const HeroScene = dynamic(() => import('./hero-scene'), { ssr: false })

type Mode = 'pending' | 'webgl' | 'fallback' | 'none'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    return Boolean(gl)
  } catch {
    return false
  }
}

/**
 * The site's one persistent WebGL layer: a fixed canvas behind every section (z-index -1, under the
 * page's own in-flow content). It loads after the page does, so the hero's words never wait for it.
 */
export function ApexStage() {
  const pathname = usePathname()
  const [mode, setMode] = useState<Mode>('pending')
  const [hero, setHero] = useState<HTMLElement | null>(null)
  const [mobile, setMobile] = useState(false)
  const [active, setActive] = useState(true)
  const [ready, setReady] = useState(false)
  const scrollLayer = useRef<HTMLDivElement>(null)
  const signals = useRef<StageSignals>({ heroProgress: 0, pointer: { x: 0, y: 0 }, stage: null })

  useEffect(() => {
    const heroElement = document.querySelector<HTMLElement>('main .hero')
    setHero(heroElement)
    setReady(false)
    if (!heroElement) return setMode('none')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !supportsWebGL()) return setMode('fallback')
    setMobile(matchMedia('(pointer: coarse), (max-width: 767px)').matches)

    let cancelled = false
    let cancelIdle = () => {}
    const start = () => {
      const run = () => { if (!cancelled) setMode('webgl') }
      if (typeof window.requestIdleCallback === 'function') {
        const id = window.requestIdleCallback(run, { timeout: 1500 })
        cancelIdle = () => window.cancelIdleCallback(id)
      } else {
        const id = setTimeout(run, 200)
        cancelIdle = () => clearTimeout(id)
      }
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener('load', start)
      cancelIdle()
    }
  }, [pathname])

  useEffect(() => {
    if (mode !== 'webgl' || !hero) return
    signals.current.stage = scrollLayer.current
    const measure = () => {
      const rect = hero.getBoundingClientRect()
      signals.current.heroProgress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)))
    }
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      signals.current.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      signals.current.pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    // the frameloop stops once the hero has scrolled away; the faded last frame stays painted
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0 })
    observer.observe(hero)
    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [mode, hero])

  if (mode === 'fallback' && hero) {
    return createPortal(<div className="apex-hero-fallback" aria-hidden="true" />, hero)
  }
  if (mode !== 'webgl') return null
  return (
    <div className={`apex-stage${ready ? ' is-ready' : ''}`} aria-hidden="true">
      <div className="apex-stage__scroll" ref={scrollLayer}>
        <HeroScene signals={signals.current} mobile={mobile} active={active} onReady={() => setReady(true)} />
      </div>
    </div>
  )
}
