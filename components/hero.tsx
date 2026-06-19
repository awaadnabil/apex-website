'use client'

import { useEffect, useRef } from 'react'
import { ApexButton } from './apex-button'

const DUST = [
  { left: '12%', top: '30%', size: 3, dx: '40px', dy: '-60px', dur: '14s', delay: '0s' },
  { left: '78%', top: '24%', size: 2, dx: '-30px', dy: '-80px', dur: '18s', delay: '3s' },
  { left: '52%', top: '62%', size: 4, dx: '24px', dy: '-50px', dur: '16s', delay: '6s' },
]

export function Hero() {
  const wordRef = useRef<HTMLHeadingElement>(null)
  const fitRef = useRef(1)

  useEffect(() => {
    const el = wordRef.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0

    // Measure the text's natural (untransformed) width and derive a scale that
    // makes APEX fill exactly 85% of the viewport width — no clipping, no scroll.
    const measure = () => {
      // scrollWidth reflects layout width and is unaffected by CSS transforms.
      const natural = el.scrollWidth
      fitRef.current = natural > 0 ? (window.innerWidth * 0.85) / natural : 1
    }

    const update = () => {
      raf = 0
      const fit = fitRef.current
      if (reduce) {
        el.style.transform = `scale(${fit})`
        return
      }
      const h = window.innerHeight
      const p = Math.min(1, Math.max(0, window.scrollY / (h * 0.85)))
      // scale down + drift toward top-left as the user scrolls past the hero
      const scale = fit * (1 - p * 0.78)
      const x = p * -38
      const y = p * -34
      el.style.transform = `translate3d(${x}vw, ${y}vh, 0) scale(${scale})`
      el.style.opacity = String(1 - p * 1.15)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const onResize = () => {
      measure()
      update()
    }

    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="top"
      className="relative flex h-[100svh] min-h-[640px] w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-supercars-h7OydBomTgS4J9Cz59dYOKCUL8My8z.jpg"
        alt="A Bugatti Chiron leading supercars down Sheikh Zayed Road at sunset with the Dubai skyline"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-carbon/[0.65]" />
      <div className="absolute inset-0 bg-gradient-to-b from-carbon/40 via-transparent to-carbon" />

      {/* carbon dust */}
      {DUST.map((d, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="animate-dust pointer-events-none absolute rounded-full bg-gold/60"
          style={
            {
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              '--dx': d.dx,
              '--dy': d.dy,
              '--dur': d.dur,
              '--delay': d.delay,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col items-center px-4 text-center">
        <h1
          ref={wordRef}
          className="select-none whitespace-nowrap font-extrabold leading-[0.8] tracking-[0.03em] text-white"
          style={{
            fontSize: 'clamp(4rem, 20vw, 18rem)',
            willChange: 'transform, opacity',
          }}
        >
          APEX
        </h1>

        <span className="mt-6 block h-px w-20 bg-gold" aria-hidden="true" />

        <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.6em] text-gold">
          GCC&apos;s Premier Motor Community
        </p>

        <p className="mt-16 text-[13px] italic text-white/70">
          By invitation. By passion. By machine.
        </p>
      </div>

      {/* CTAs */}
      <div className="absolute bottom-24 z-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <ApexButton href="#membership" variant="white">
          Download iOS
        </ApexButton>
        <ApexButton href="#membership" variant="gold">
          Request Access
        </ApexButton>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-3">
        <span className="text-[8px] uppercase tracking-[0.5em] text-gold">Scroll</span>
        <span className="animate-scroll-line block h-10 w-px bg-gold" aria-hidden="true" />
      </div>
    </section>
  )
}
