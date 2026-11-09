'use client'

import { motion, useReducedMotion, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'

export function Magnetic({
  href,
  className,
  children,
  strength = 0.3,
}: {
  href: string
  className?: string
  children: ReactNode
  strength?: number
}) {
  const reduced = useReducedMotion()
  const spring = { stiffness: 240, damping: 16, mass: 0.4 }
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)

  return (
    <motion.a
      href={href}
      style={{ x, y }}
      className={className}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.a>
  )
}
