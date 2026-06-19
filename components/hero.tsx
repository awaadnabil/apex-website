'use client'

import { useEffect, useRef } from 'react'

const LETTERS = ['A', 'P', 'E', 'X']

export function Hero() {
  const wordRef = useRef<HTMLHeadingElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const fitRef = useRef(1)

  useEffect(() => {
    const el = wordRef.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0

    // Measure the text's natural (untransformed) width and derive a scale that
    // makes APEX fill exactly 85% of the viewport width — no clipping, no scroll.
    const measure = () => {
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

  // Subtle pointer parallax on the photograph for depth.
  useEffect(() => {
    const wrap = parallaxRef.current
    if (!wrap) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let tx = 0
    let ty = 0

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      tx = nx * -14
      ty = ny * -14
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0
          wrap.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
        })
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="top"
      className="relative flex h-[100svh] min-h-[640px] w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Background — trust the photography, keep the overlay light */}
      <div ref={parallaxRef} className="absolute inset-0 scale-[1.06]" style={{ willChange: 'transform' }}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-supercars-h7OydBomTgS4J9Cz59dYOKCUL8My8z.jpg"
          alt="A Bugatti Chiron leading supercars down Sheikh Zayed Road at sunset with the Dubai skyline"
          fetchPriority="high"
          className="kenburns h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-carbon/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-carbon/20 via-transparent to-carbon/90" />

      {/* The brand. Nothing else. */}
      <div className="relative z-10 flex w-full justify-center px-4">
        <h1
          ref={wordRef}
          aria-label="APEX"
          className="flex select-none whitespace-nowrap font-extrabold leading-[0.8] tracking-[0.03em] text-white"
          style={{
            fontSize: 'clamp(4rem, 20vw, 18rem)',
            willChange: 'transform, opacity',
          }}
        >
          {LETTERS.map((letter, i) => (
            <span key={letter} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em]">
              <span className="hero-letter" style={{ ['--d' as string]: `${1700 + i * 110}ms` }}>
                {letter}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* A single thin white line. The only mark at rest. */}
      <span
        className="absolute bottom-10 left-1/2 z-10 h-12 w-px -translate-x-1/2 bg-white/40"
        aria-hidden="true"
      />
    </section>
  )
}
