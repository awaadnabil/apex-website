'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { spring } from '@/lib/motion'
import { createSpring } from '@/lib/site/spring'
import './interactions.css'

const TILT_MAX_DEG = 8
const MAGNET_MAX_PX = 12
const IMAGE_PARALLAX_PX = 10
const PROXIMITY_PX = 160

type Cleanup = () => void

function layer(parent: HTMLElement, className: string, inner = false) {
  const el = document.createElement('span')
  el.className = className
  el.setAttribute('aria-hidden', 'true')
  if (inner) el.append(document.createElement('i'))
  parent.append(el)
  return el
}

/** Cards: 3D tilt on a spring, cursor-following sheen, a lit edge that brightens as the cursor nears. */
function cards(root: ParentNode, cleanups: Cleanup[]) {
  const list = [...root.querySelectorAll<HTMLElement>('main .card')]
  const near = new Set<HTMLElement>()
  const visible = new IntersectionObserver((entries) => entries.forEach((e) => (e.isIntersecting ? near.add(e.target as HTMLElement) : near.delete(e.target as HTMLElement))))

  list.forEach((card) => {
    const added = [layer(card, 'apx-sheen'), layer(card, 'apx-edge', true)]
    // the featured card (the weekly spotlight) also gets the holographic sheen
    if (card.querySelector('.apx-spot')) added.push(layer(card, 'apx-holo'))
    visible.observe(card)
    const parent = card.parentElement
    const tilt = createSpring(spring.snappy, 2, ([rx, ry]) => {
      const angle = Math.hypot(rx, ry)
      card.style.rotate = angle < 0.01 ? '' : `${rx / angle} ${ry / angle} 0 ${angle}deg`
      if (angle < 0.01 && tilt?.settled && parent) parent.style.removeProperty('perspective')
    })
    const onEnter = () => {
      if (parent) parent.style.perspective = '1000px'
      card.classList.add('is-pointer')
    }
    const onMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      card.style.setProperty('--x', `${(px * 100).toFixed(1)}%`)
      card.style.setProperty('--y', `${(py * 100).toFixed(1)}%`)
      tilt.set([-(py - 0.5) * 2 * TILT_MAX_DEG, (px - 0.5) * 2 * TILT_MAX_DEG])
    }
    const onLeave = () => {
      card.classList.remove('is-pointer')
      tilt.set([0, 0])
    }
    card.addEventListener('pointerenter', onEnter)
    card.addEventListener('pointermove', onMove)
    card.addEventListener('pointerleave', onLeave)
    cleanups.push(() => {
      tilt.stop()
      card.removeEventListener('pointerenter', onEnter)
      card.removeEventListener('pointermove', onMove)
      card.removeEventListener('pointerleave', onLeave)
      card.classList.remove('is-pointer')
      card.style.removeProperty('rotate')
      ;['--x', '--y', '--apx-near'].forEach((p) => card.style.removeProperty(p))
      parent?.style.removeProperty('perspective')
      added.forEach((el) => el.remove())
    })
  })

  // proximity: the edge brightens as the cursor approaches, before it is over the card
  let frame = 0
  let pointer = { x: -9999, y: -9999 }
  const update = () => {
    frame = 0
    near.forEach((card) => {
      const r = card.getBoundingClientRect()
      const dx = Math.max(r.left - pointer.x, 0, pointer.x - r.right)
      const dy = Math.max(r.top - pointer.y, 0, pointer.y - r.bottom)
      const closeness = Math.max(0, 1 - Math.hypot(dx, dy) / PROXIMITY_PX)
      card.style.setProperty('--apx-near', closeness.toFixed(2))
    })
  }
  const onPointer = (event: PointerEvent) => {
    pointer = { x: event.clientX, y: event.clientY }
    if (!frame) frame = requestAnimationFrame(update)
  }
  window.addEventListener('pointermove', onPointer, { passive: true })
  cleanups.push(() => {
    cancelAnimationFrame(frame)
    visible.disconnect()
    window.removeEventListener('pointermove', onPointer)
  })
}

/** Buttons and the store badge: magnetic pull toward the cursor (max 12px) on a spring. */
function magnets(root: ParentNode, cleanups: Cleanup[]) {
  root.querySelectorAll<HTMLElement>('.btn, .apx-badge').forEach((el) => {
    const pull = createSpring(spring.snappy, 2, ([x, y]) => {
      el.style.translate = Math.abs(x) + Math.abs(y) < 0.05 ? '' : `${x.toFixed(2)}px ${y.toFixed(2)}px`
    })
    const onMove = (event: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const dx = event.clientX - (r.left + r.width / 2)
      const dy = event.clientY - (r.top + r.height / 2)
      const clamp = (v: number) => Math.max(-MAGNET_MAX_PX, Math.min(MAGNET_MAX_PX, v * 0.35))
      pull.set([clamp(dx), clamp(dy)])
    }
    const onLeave = () => pull.set([0, 0])
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    cleanups.push(() => {
      pull.stop()
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.style.removeProperty('translate')
    })
  })
}

/** Buttons: hover/focus glow and a ripple from the press point (touch too). The badge is Apple's artwork and is left plain. */
function ripples(root: ParentNode, cleanups: Cleanup[]) {
  root.querySelectorAll<HTMLElement>('.btn').forEach((button) => {
    const glow = layer(button, 'apx-glow')
    const host = layer(button, 'apx-ripple-host')
    const onDown = (event: PointerEvent) => {
      const r = button.getBoundingClientRect()
      const size = Math.max(r.width, r.height) * 2.2
      const dot = document.createElement('i')
      dot.style.left = `${event.clientX - r.left}px`
      dot.style.top = `${event.clientY - r.top}px`
      dot.style.width = dot.style.height = `${size}px`
      host.append(dot)
      dot.animate(
        [{ transform: 'translate(-50%, -50%) scale(0)', opacity: 0.35 }, { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 }],
        { duration: 400, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      ).onfinish = () => dot.remove()
    }
    button.addEventListener('pointerdown', onDown)
    cleanups.push(() => {
      button.removeEventListener('pointerdown', onDown)
      glow.remove()
      host.remove()
    })
  })
}

/** The primary CTA: three dots travel its outline. */
function orbit(root: ParentNode, cleanups: Cleanup[]) {
  const cta = root.querySelector<HTMLElement>('header .btn--primary')
  if (!cta || !CSS.supports('offset-path', 'inset(0 round 1px)')) return
  const ring = layer(cta, 'apx-orbit')
  for (let i = 0; i < 3; i++) ring.append(document.createElement('i'))
  cleanups.push(() => ring.remove())
}

/** Photos: inner parallax opposite the cursor, and a brief liquid ripple while hovered. */
function photos(root: ParentNode, cleanups: Cleanup[]) {
  const frames = [...root.querySelectorAll<HTMLElement>('main .frame--photo')].filter((f) => f.querySelector(':scope > img.frame__img'))
  if (!frames.length) return
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('class', 'apx-svg-defs')
  svg.innerHTML =
    '<filter id="apx-liquid" x="-5%" y="-5%" width="110%" height="110%">' +
    '<feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="4" result="noise"/>' +
    '<feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>'
  document.body.append(svg)
  const turbulence = svg.querySelector('feTurbulence')!
  const displacement = svg.querySelector('feDisplacementMap')!
  let hovered = 0
  let frame = 0
  let strength = 0
  const animateLiquid = (now: number) => {
    strength += ((hovered ? 9 : 0) - strength) * 0.12
    displacement.setAttribute('scale', strength.toFixed(2))
    const t = now / 1000
    turbulence.setAttribute('baseFrequency', `${(0.008 + Math.sin(t * 0.7) * 0.002).toFixed(4)} ${(0.012 + Math.cos(t * 0.5) * 0.003).toFixed(4)}`)
    frame = hovered || strength > 0.05 ? requestAnimationFrame(animateLiquid) : 0
    if (!frame) frames.forEach((f) => f.classList.remove('is-liquid'))
  }

  frames.forEach((frameEl) => {
    const img = frameEl.querySelector<HTMLImageElement>(':scope > img.frame__img')!
    // the picture grows just enough (≥ 10px each side) to hide its edges while it shifts, only while hovered
    const shift = createSpring(spring.soft, 3, ([x, y, grow]) => {
      const still = Math.abs(x) + Math.abs(y) < 0.05 && grow < 0.001
      img.style.translate = still ? '' : `${x.toFixed(2)}px ${y.toFixed(2)}px`
      img.style.scale = still ? '' : (1 + grow).toFixed(4)
    })
    const growFor = () => (2 * IMAGE_PARALLAX_PX + 4) / Math.max(1, Math.min(frameEl.clientWidth, frameEl.clientHeight))
    const onEnter = () => {
      hovered++
      frameEl.classList.add('is-liquid', 'is-pointer')
      if (!frame) frame = requestAnimationFrame(animateLiquid)
    }
    const onMove = (event: PointerEvent) => {
      const r = frameEl.getBoundingClientRect()
      const px = (event.clientX - r.left) / r.width - 0.5
      const py = (event.clientY - r.top) / r.height - 0.5
      shift.set([-px * 2 * IMAGE_PARALLAX_PX, -py * 2 * IMAGE_PARALLAX_PX, growFor()])
    }
    const onLeave = () => {
      hovered = Math.max(0, hovered - 1)
      frameEl.classList.remove('is-pointer')
      shift.set([0, 0, 0])
    }
    frameEl.addEventListener('pointerenter', onEnter)
    frameEl.addEventListener('pointermove', onMove)
    frameEl.addEventListener('pointerleave', onLeave)
    cleanups.push(() => {
      shift.stop()
      frameEl.removeEventListener('pointerenter', onEnter)
      frameEl.removeEventListener('pointermove', onMove)
      frameEl.removeEventListener('pointerleave', onLeave)
      frameEl.classList.remove('is-liquid', 'is-pointer')
      img.style.removeProperty('translate')
      img.style.removeProperty('scale')
    })
  })
  cleanups.push(() => {
    cancelAnimationFrame(frame)
    svg.remove()
  })
}

/** Section headings: one 150 ms RGB split as they enter, after their entrance has settled. */
function glitches(root: ParentNode, cleanups: Cleanup[]) {
  const timers: number[] = []
  const headings = [...root.querySelectorAll<HTMLElement>('main section h2')]
    // a heading the kit animates letter by letter keeps its own moment
    .filter((h) => !h.querySelector('[class^="mo-"], [class*=" mo-"]') && !h.closest('[data-moment]'))
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      observer.unobserve(entry.target)
      const heading = entry.target as HTMLElement
      timers.push(window.setTimeout(() => {
        heading.animate(
          [
            { filter: 'none', translate: '0 0' },
            { filter: 'drop-shadow(3px 0 0 rgb(0 200 200 / 0.85)) drop-shadow(-3px 0 0 rgb(154 164 171 / 0.7))', translate: '-2px 0', offset: 0.3 },
            { filter: 'drop-shadow(-2px 0 0 rgb(0 200 200 / 0.85)) drop-shadow(2px 0 0 rgb(154 164 171 / 0.7))', translate: '1px 0', offset: 0.65 },
            { filter: 'none', translate: '0 0' },
          ],
          { duration: 150, easing: 'steps(3, end)' },
        )
      }, 900))
    })
  }, { threshold: 0.2 })
  headings.forEach((h) => observer.observe(h))
  cleanups.push(() => {
    observer.disconnect()
    timers.forEach(clearTimeout)
  })
}

export function InteractionLayer() {
  const pathname = usePathname()

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches || location.search.includes('apx-fine') // TEMP test override
    const cleanups: Cleanup[] = []
    const html = document.documentElement
    html.dataset.apxInteract = reduced ? 'off' : fine ? 'full' : 'touch'
    if (!reduced) {
      ripples(document, cleanups)
      glitches(document, cleanups)
      if (fine) {
        cards(document, cleanups)
        magnets(document, cleanups)
        orbit(document, cleanups)
        photos(document, cleanups)
      }
    }
    return () => {
      cleanups.forEach((cleanup) => cleanup())
      delete html.dataset.apxInteract
    }
  }, [pathname])

  return null
}
