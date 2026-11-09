'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useScroll } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { duration, gsapEase, smoothScrollDuration, staggerFor } from '@/lib/motion'
import './motion-foundation.css'

// Lenis scrolls the native window, so Motion reads the same scroll source without a second RAF.
export function useSiteScroll() {
  return useScroll()
}

export function MotionFoundation() {
  const pathname = usePathname()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const root = document.documentElement
    const media = gsap.matchMedia()
    media.add({ reduced: '(prefers-reduced-motion: reduce)', standard: '(prefers-reduced-motion: no-preference)' }, (context) => {
      const reduced = Boolean(context.conditions?.reduced)
      const cleanups: (() => void)[] = []
      let lenis: Lenis | undefined
      if (!reduced) {
        lenis = new Lenis({
          duration: smoothScrollDuration,
          autoRaf: false,
          syncTouch: false,
          anchors: false,
          prevent: (node) => Boolean(node.closest('dialog, [role="dialog"], [data-lenis-prevent]')),
        })
        const update = () => ScrollTrigger.update()
        const tick = (seconds: number) => lenis?.raf(seconds * 1000)
        lenis.on('scroll', update)
        gsap.ticker.add(tick)
        root.classList.add('apex-smooth-scroll')
        cleanups.push(() => {
          gsap.ticker.remove(tick)
          lenis?.off('scroll', update)
          lenis?.destroy()
          root.classList.remove('apex-smooth-scroll')
        })
      }

      const entrances = new Map<Element, gsap.core.Tween>()
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entrances.get(entry.target)?.play()
          observer.unobserve(entry.target)
        }
      }, { threshold: 0.2 })
      cleanups.push(() => observer.disconnect())

      document.querySelectorAll<HTMLElement>('main .section').forEach((section) => {
        const wrap = section.querySelector<HTMLElement>(':scope > .wrap')
        if (!wrap) return
        const blocks = Array.from(wrap.children).flatMap((child) =>
          child.classList.contains('grid') ? Array.from(child.children) : [child],
        ).filter((element): element is HTMLElement => element instanceof HTMLElement)
        const pending = blocks.filter((element) => element.getBoundingClientRect().top >= window.innerHeight)
        const step = staggerFor(pending.length)

        blocks.forEach((element) => {
          element.setAttribute('data-apex-motion-target', '')
          cleanups.push(() => {
            element.removeAttribute('data-apex-motion-target')
            element.style.removeProperty('will-change')
          })
        })
        pending.forEach((element, index) => {
          const tween = gsap.fromTo(element,
            reduced ? { opacity: 0 } : { opacity: 0, y: 40, filter: 'blur(6px)' },
            {
              opacity: 1, ...(reduced ? {} : { y: 0, filter: 'blur(0px)' }),
              duration: reduced ? duration.reduced : duration.reveal,
              delay: reduced ? 0 : index * step,
              ease: gsapEase.out, paused: true,
              onStart: () => { element.style.willChange = reduced ? 'opacity' : 'transform, opacity, filter' },
              onComplete: () => { element.style.removeProperty('will-change') },
            },
          )
          entrances.set(element, tween)
          observer.observe(element)
        })

        if (!reduced) {
          wrap.setAttribute('data-apex-motion-target', '')
          cleanups.push(() => wrap.removeAttribute('data-apex-motion-target'))
          gsap.to(wrap, {
            opacity: 0.25, scale: 0.98, filter: 'blur(4px)', ease: gsapEase.inOut,
            scrollTrigger: {
              trigger: section, start: 'bottom 18%', end: 'bottom top', scrub: true,
              invalidateOnRefresh: true,
            },
          })
        }
      })

      // Keyboard focus reveals a not-yet-entered block immediately, without moving focus or scrolling.
      const onFocus = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) return
        for (const [element, tween] of entrances) {
          if (element.contains(event.target)) {
            tween.progress(1).pause()
            observer.unobserve(element)
          }
        }
      }
      document.addEventListener('focusin', onFocus)
      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh, { once: true })
      let disposed = false
      document.fonts.ready.then(() => { if (!disposed) refresh() })
      refresh()
      root.setAttribute('data-apex-motion-ready', reduced ? 'reduced' : 'standard')

      return () => {
        disposed = true
        document.removeEventListener('focusin', onFocus)
        window.removeEventListener('load', refresh)
        cleanups.forEach((cleanup) => cleanup())
        root.removeAttribute('data-apex-motion-ready')
      }
    })
    return () => media.revert()
  }, [pathname])

  return null
}
