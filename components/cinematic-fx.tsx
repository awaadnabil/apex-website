'use client'

import { useEffect, useRef } from 'react'

/**
 * Always-on cinematic layer:
 *  - animated film grain
 *  - soft vignette
 *  - top scroll-progress hairline (gold)
 * All purely decorative, pointer-events: none, and disabled for reduced-motion.
 */
export function CinematicFx() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    let raf = 0

    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      bar.style.setProperty('--p', String(p))
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={barRef} className="scroll-progress" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
