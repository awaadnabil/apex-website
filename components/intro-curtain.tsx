'use client'

import { useEffect, useState } from 'react'

/**
 * A single keynote-style curtain that reveals the page on first paint,
 * then unmounts so it never blocks interaction. Skipped for reduced-motion.
 */
export function IntroCurtain() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      return
    }
    const t = setTimeout(() => setDone(true), 2500)
    return () => clearTimeout(t)
  }, [])

  if (done) return null

  return (
    <div
      className="curtain fixed inset-0 z-[100] flex flex-col items-center justify-center bg-carbon"
      aria-hidden="true"
    >
      <span className="curtain-word text-[11px] font-bold uppercase tracking-[0.6em] text-white/70">
        APEX
      </span>
      <span className="curtain-rule mt-5 h-px w-24 bg-gold" />
      <span className="curtain-word mt-5 text-[9px] uppercase tracking-[0.45em] text-white/40">
        By invitation
      </span>
    </div>
  )
}
