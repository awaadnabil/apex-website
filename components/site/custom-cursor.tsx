'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { duration, spring } from '@/lib/motion'

const INTERACTIVE = 'a, button, [role="button"], summary, label'
const NATIVE = 'input, textarea, select, [contenteditable="true"]'
const PHOTO = 'main .frame--photo'
// a card is a large reading surface: the ring only opens up over it, so the copy stays legible
const SURFACE = 'main .card'

type Mode = 'idle' | 'interactive' | 'surface' | 'photo' | 'native'

/** Fine pointers only: a 6px dot on the pointer and a 36px ring that follows on spring.soft. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<Mode>('idle')
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('VIEW')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, spring.soft)
  const ringY = useSpring(y, spring.soft)

  useEffect(() => {
    const query = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const sync = () => setEnabled(query.matches || location.search.includes('apx-fine')) // TEMP test override
    sync()
    query.addEventListener('change', sync)
    setLabel(document.documentElement.lang === 'ar' ? 'عرض' : 'VIEW')
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const html = document.documentElement
    html.classList.add('apx-cursor')
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
      const target = event.target instanceof Element ? event.target : null
      setMode(
        target?.closest(NATIVE) ? 'native'
          : target?.closest(PHOTO) ? 'photo'
          : target?.closest(INTERACTIVE) ? 'interactive'
          : target?.closest(SURFACE) ? 'surface'
          : 'idle',
      )
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      html.classList.remove('apx-cursor')
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  const shown = visible && mode !== 'native'
  const ringScale = mode === 'interactive' ? 1.8 : mode === 'photo' ? 2.2 : mode === 'surface' ? 1.4 : 1
  const transition = { duration: duration.ui, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <div className="apx-cursor-layer" aria-hidden="true">
      <motion.span
        className={`apx-cursor-ring${mode === 'interactive' ? ' is-difference' : ''}`}
        style={{ x: ringX, y: ringY }}
        animate={{ scale: ringScale, opacity: shown ? 1 : 0 }}
        transition={transition}
      >
        <motion.span className="apx-cursor-label" animate={{ opacity: mode === 'photo' ? 1 : 0 }} transition={transition}>
          {label}
        </motion.span>
      </motion.span>
      <motion.span
        className="apx-cursor-dot"
        style={{ x, y }}
        animate={{ opacity: shown && mode !== 'photo' ? 1 : 0 }}
        transition={{ duration: duration.micro }}
      />
    </div>
  )
}
