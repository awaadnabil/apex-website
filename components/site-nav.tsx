'use client'

import { useEffect, useRef } from 'react'

export function SiteNav() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0

    const update = () => {
      raf = 0
      const trigger = window.innerHeight * 0.7
      const p = Math.min(1, Math.max(0, (window.scrollY - trigger * 0.4) / trigger))
      el.style.opacity = String(p)
      el.style.transform = `translateY(${(1 - p) * -12}px)`
      el.style.pointerEvents = p > 0.5 ? 'auto' : 'none'
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={ref}
        className="fixed left-6 top-6 z-50 opacity-0 md:left-10 md:top-8"
        style={{ willChange: 'opacity, transform' }}
      >
        <a
          href="#top"
          className="text-xl font-extrabold tracking-[0.04em] text-white md:text-2xl"
          aria-label="APEX — back to top"
        >
          APEX
        </a>
      </div>

      {/* Always-visible primary link to the Membership page */}
      <nav className="fixed right-6 top-6 z-50 md:right-10 md:top-8">
        <a
          href="/membership"
          className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80 transition-colors duration-500 hover:text-white"
        >
          Membership
        </a>
      </nav>
    </>
  )
}
