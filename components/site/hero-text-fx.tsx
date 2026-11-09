'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { duration, ease, stagger } from '@/lib/motion'

// a glyph of the same case and rough width as the character it stands in for, so the line stays even
const POOLS = { lower: 'acemnorsuvwxz', upper: 'ABCDEHKNOPRSUVXZ', digit: '0123456789', other: '/<>#*+' }
const glyphFor = (char: string) => {
  const pool = /[a-z]/.test(char) ? POOLS.lower : /[A-Z]/.test(char) ? POOLS.upper : /\d/.test(char) ? POOLS.digit : POOLS.other
  return pool[Math.floor(Math.random() * pool.length)]
}
const MS_PER_CHAR = 40
const CYCLE_MS = 55
const CSS_EASE_OUT = `cubic-bezier(${ease.out.join(',')})`
const CSS_EASE_IN_OUT = `cubic-bezier(${ease.inOut.join(',')})`

/** Resolves when the boot overlay has gone and the kit's own hero entrance has begun (or 3 s pass). */
function whenHeroStarts(hero: HTMLElement) {
  const booted = new Promise<void>((resolve) => {
    if (!document.documentElement.classList.contains('apex-booting')) return resolve()
    window.addEventListener('apex:boot-done', () => resolve(), { once: true })
  })
  const kit = new Promise<void>((resolve) => {
    const started = () => hero.classList.contains('is-entering') || hero.classList.contains('is-entered')
    if (started()) return resolve()
    const observer = new MutationObserver(() => { if (started()) { observer.disconnect(); resolve() } })
    observer.observe(hero, { attributes: true, attributeFilter: ['class'] })
    setTimeout(() => { observer.disconnect(); resolve() }, 3000)
  })
  return Promise.all([booted, kit])
}

/**
 * Each character keeps its own glyph (transparent) so the line never reflows; the scrambled glyph is
 * painted over it by ::after. Characters resolve left to right, 40 ms apart.
 */
function scramble(h1: HTMLElement, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    const runs: { run: HTMLSpanElement; text: string }[] = []
    const chars: HTMLSpanElement[] = []
    const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    while (walker.nextNode()) nodes.push(walker.currentNode as Text)
    for (const node of nodes) {
      const text = node.data
      if (!text.trim()) continue
      const run = document.createElement('span')
      run.className = 'apx-scr-run'
      for (const char of text) {
        if (/\s/.test(char)) { run.append(char); continue }
        const span = document.createElement('span')
        span.className = 'apx-scr'
        span.textContent = char
        run.append(span)
        chars.push(span)
      }
      node.replaceWith(run)
      runs.push({ run, text })
    }
    const restore = () => {
      runs.forEach(({ run, text }) => run.replaceWith(document.createTextNode(text)))
      resolve()
    }
    const started = performance.now()
    let lastCycle = 0
    const tick = (now: number) => {
      if (signal.aborted) return restore()
      const resolved = Math.floor((now - started) / MS_PER_CHAR)
      const cycle = now - lastCycle > CYCLE_MS
      if (cycle) lastCycle = now
      chars.forEach((span, i) => {
        if (i < resolved) span.removeAttribute('data-g')
        else if (cycle || !span.dataset.g) span.dataset.g = glyphFor(span.textContent ?? '')
      })
      if (resolved < chars.length) requestAnimationFrame(tick)
      else restore()
    }
    requestAnimationFrame(tick)
  })
}

/**
 * One accent light pass across the letters: an accent copy of the words, laid over them with the h1's
 * own padding so it wraps identically, shown through an 18%-wide clip-path band that travels across.
 */
function sweep(h1: HTMLElement, rtl: boolean) {
  const style = getComputedStyle(h1)
  const wasStatic = style.position === 'static'
  if (wasStatic) h1.style.position = 'relative'
  const layer = document.createElement('span')
  layer.className = 'apx-sweep'
  layer.setAttribute('aria-hidden', 'true')
  layer.style.padding = style.padding
  layer.textContent = h1.textContent
  h1.append(layer)
  const start = 'inset(0 100% 0 -18%)'
  const end = 'inset(0 -18% 0 100%)'
  const animation = layer.animate(
    [{ clipPath: rtl ? end : start }, { clipPath: rtl ? start : end }],
    { duration: 1100, easing: CSS_EASE_IN_OUT },
  )
  const cleanup = () => {
    layer.remove()
    if (wasStatic) h1.style.removeProperty('position')
  }
  animation.onfinish = cleanup
  animation.oncancel = cleanup
  return animation
}

export function HeroTextFx() {
  const pathname = usePathname()

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('main .hero')
    const h1 = hero?.querySelector<HTMLElement>('h1')
    if (!hero || !h1 || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rtl = document.documentElement.dir === 'rtl'
    const controller = new AbortController()
    const animations: Animation[] = []
    let releaseObserver: MutationObserver | undefined

    whenHeroStarts(hero).then(async () => {
      if (controller.signal.aborted) return

      // the lead, the buttons and the proof line rise out of a blur; the kit's own entrance still runs,
      // and these hold its final state until it is through, then let go
      const items = hero.querySelectorAll<HTMLElement>('.hero__lead, .btn-row, .hero__proof')
      items.forEach((item, index) => {
        animations.push(item.animate(
          [{ opacity: 0, transform: 'translateY(24px)', filter: 'blur(8px)' }, { opacity: 1, transform: 'none', filter: 'blur(0px)' }],
          { duration: duration.reveal * 1000, delay: 120 + index * stagger * 1000, easing: CSS_EASE_OUT, fill: 'both' },
        ))
      })
      const release = () => animations.forEach((animation) => animation.cancel())
      Promise.all(animations.map((animation) => animation.finished)).then(() => {
        if (hero.classList.contains('is-entered')) return release()
        releaseObserver = new MutationObserver(() => {
          if (hero.classList.contains('is-entered')) { releaseObserver?.disconnect(); release() }
        })
        releaseObserver.observe(hero, { attributes: true, attributeFilter: ['class'] })
        setTimeout(() => { releaseObserver?.disconnect(); release() }, 2500)
      }).catch(() => {})

      // Arabic letters join: split into spans they would lose their shapes, so Arabic gets only the sweep
      // the copy must lie on settled lines: wait out the kit's line-by-line rise
      if (!rtl) await scramble(h1, controller.signal)
      else await new Promise((resolve) => setTimeout(resolve, 1200))
      if (!controller.signal.aborted) animations.push(sweep(h1, rtl))
    })

    return () => {
      controller.abort()
      releaseObserver?.disconnect()
      animations.forEach((animation) => animation.cancel())
    }
  }, [pathname])

  return null
}
