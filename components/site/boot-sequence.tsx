'use client'

import { useEffect, useRef } from 'react'
import { ease } from '@/lib/motion'
import './stage.css'

const LABEL = 'SYS://INITIALIZING'
const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/<>#*+'
const BOOT_TOTAL_MS = 1200
const CSS_EASE_OUT = `cubic-bezier(${ease.out.join(',')})`
const CSS_EASE_EXPO = `cubic-bezier(${ease.expo.join(',')})`

/** Plays only when the head script (lib/site/boot-gate.ts) has marked html.apex-booting. */
export function BootSequence() {
  const root = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const html = document.documentElement
    const overlay = root.current
    if (!overlay || !html.classList.contains('apex-booting')) return

    // the 1.2 s budget counts from navigation, so a late hydration shortens the sequence rather than the wait
    const total = Math.max(600, BOOT_TOTAL_MS - performance.now())
    const decodeEnd = total * 0.45
    const splitStart = total * 0.62
    const animations: Animation[] = []
    let frame = 0
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      cancelAnimationFrame(frame)
      animations.forEach((animation) => animation.cancel())
      html.classList.remove('apex-booting')
      window.dispatchEvent(new Event('apex:boot-done'))
    }

    const started = performance.now()
    const decode = () => {
      const elapsed = performance.now() - started
      const resolved = Math.floor((elapsed / decodeEnd) * LABEL.length)
      if (label.current) {
        label.current.textContent = Array.from(LABEL, (char, i) =>
          i < resolved || char === '/' || char === ':' ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        ).join('')
      }
      if (resolved < LABEL.length) frame = requestAnimationFrame(decode)
    }
    frame = requestAnimationFrame(decode)

    const bar = overlay.querySelector<HTMLElement>('.apex-boot__bar i')
    const line = overlay.querySelector<HTMLElement>('.apex-boot__line')
    const halves = overlay.querySelectorAll<HTMLElement>('.apex-boot__half')
    const content = overlay.querySelector<HTMLElement>('.apex-boot__content')
    if (bar) animations.push(bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: splitStart - total * 0.08, delay: total * 0.08, easing: CSS_EASE_OUT, fill: 'both' }))
    if (content) animations.push(content.animate([{ opacity: 1 }, { opacity: 0 }], { duration: total * 0.12, delay: splitStart, fill: 'both' }))
    if (line) {
      animations.push(line.animate(
        [{ transform: 'scaleX(0.12)', opacity: 0 }, { transform: 'scaleX(1)', opacity: 1, offset: 0.45 }, { transform: 'scaleX(1)', opacity: 0 }],
        { duration: total - splitStart, delay: splitStart, easing: CSS_EASE_OUT, fill: 'both' },
      ))
    }
    halves.forEach((half, index) => {
      const closed = index === 0 ? 'inset(0 0 50% 0)' : 'inset(50% 0 0 0)'
      const open = index === 0 ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)'
      animations.push(half.animate([{ clipPath: closed }, { clipPath: open }], { duration: total - splitStart, delay: splitStart, easing: CSS_EASE_EXPO, fill: 'both' }))
    })
    const last = animations.at(-1)
    if (last) last.onfinish = finish
    else finish()

    const skip = () => finish()
    window.addEventListener('pointerdown', skip, { once: true })
    window.addEventListener('keydown', skip, { once: true })
    return () => {
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
      finish()
    }
  }, [])

  return (
    <div className="apex-boot" ref={root} aria-hidden="true">
      <div className="apex-boot__half" />
      <div className="apex-boot__half" />
      <span className="apex-boot__line" />
      <div className="apex-boot__content">
        <p className="apex-boot__label" ref={label} dir="ltr">{LABEL}</p>
        <span className="apex-boot__bar"><i /></span>
      </div>
    </div>
  )
}
