'use client'

import { useEffect, useRef, useState } from 'react'

// Stylized (non-cartographic) route map. Positions arranged for visual flow,
// drawn in travel order: Dubai -> Abu Dhabi -> Muscat -> Nizwa -> Salalah -> Doha -> Riyadh.
const CITIES = [
  { name: 'Dubai', x: 720, y: 150 },
  { name: 'Abu Dhabi', x: 560, y: 230 },
  { name: 'Muscat', x: 860, y: 250 },
  { name: 'Nizwa', x: 760, y: 340 },
  { name: 'Salalah', x: 600, y: 430 },
  { name: 'Doha', x: 360, y: 320 },
  { name: 'Riyadh', x: 140, y: 210 },
]

const PATH = CITIES.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x} ${c.y}`).join(' ')

export function Roads() {
  const svgRef = useRef<SVGSVGElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDrawn(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setDrawn(true)
      },
      { threshold: 0.35 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = stripRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      const shift = (Math.min(1, Math.max(0, progress)) - 0.5) * 80
      const img = el.firstElementChild as HTMLElement | null
      if (img) img.style.transform = `translate3d(0, ${shift}px, 0) scale(1.18)`
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
    <section className="px-6 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <h2 className="reveal mb-16 text-left font-extrabold leading-none text-white [font-size:clamp(2.5rem,6vw,4rem)]">
          The Territory
        </h2>

        <div className="reveal w-full">
          <svg
            ref={svgRef}
            viewBox="0 0 1000 520"
            className="h-auto w-full"
            role="img"
            aria-label="Route map connecting Dubai, Abu Dhabi, Muscat, Nizwa, Salalah, Doha and Riyadh"
          >
            <path
              d={PATH}
              fill="none"
              stroke="#c9a84c"
              strokeWidth="1.5"
              strokeDasharray="2 8"
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: drawn ? '2 8' : '1 1',
                strokeDashoffset: 0,
                opacity: drawn ? 1 : 0,
                transition: 'opacity 1.8s ease-out',
              }}
            />
            {/* solid drawing line that traces the route */}
            <path
              d={PATH}
              fill="none"
              stroke="#00c8c8"
              strokeWidth="1"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={drawn ? 0 : 1}
              style={{ transition: 'stroke-dashoffset 2.6s cubic-bezier(0.16,1,0.3,1)' }}
              opacity={0.55}
            />
            {CITIES.map((c, i) => (
              <g
                key={c.name}
                style={{
                  opacity: drawn ? 1 : 0,
                  transition: `opacity 0.6s ease-out ${0.4 + i * 0.28}s`,
                }}
              >
                <circle cx={c.x} cy={c.y} r="4" fill="#c9a84c" />
                <circle cx={c.x} cy={c.y} r="9" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
                <text
                  x={c.x}
                  y={c.y - 16}
                  textAnchor="middle"
                  fill="#c9a84c"
                  className="uppercase"
                  style={{ fontSize: 12, letterSpacing: '0.2em', fontWeight: 700 }}
                >
                  {c.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* parallax cinematic strip */}
      <div ref={stripRef} className="reveal mt-20 h-[300px] w-full overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-bikes-s4mRdYk7929ut9Y6Jbo1y1yd5ZD5yf.png"
          alt="Superbikes riding a sweeping desert mountain road at sunset"
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ willChange: 'transform' }}
        />
      </div>
    </section>
  )
}
