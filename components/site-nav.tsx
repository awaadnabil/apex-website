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

      {/* Always-visible top navigation to every page */}
      <nav
        aria-label="Primary"
        className="fixed right-6 top-6 z-50 flex items-center gap-5 md:right-10 md:top-8 md:gap-8"
      >
        {[
          { label: 'Membership', href: '/membership' },
          { label: 'Concierge', href: '/concierge' },
          { label: 'Privacy', href: '/privacy' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/75 transition-colors duration-500 hover:text-white md:text-[11px]"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </>
  )
}
