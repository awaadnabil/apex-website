'use client'

import { motion, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/drive/i18n'
import { EASE, INTRO_DELAY } from '@/lib/drive/motion'
import { Magnetic } from './magnetic'

function LiquidFilter() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <filter id="liquid" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="38" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}

function FocusTitle({ text, perWord, baseDelay }: { text: string; perWord: boolean; baseDelay: number }) {
  const reduced = useReducedMotion()
  const words = text.split(' ')
  let index = 0

  const piece = (content: string, key: string) => {
    const i = index++
    return (
      <motion.span
        key={key}
        aria-hidden="true"
        className="inline-block"
        initial={reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(14px)', scale: 1.18, y: '0.12em' }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)', scale: 1, y: '0em' }}
        transition={{ duration: 0.95, ease: EASE, delay: baseDelay + i * (perWord ? 0.12 : 0.035) }}
      >
        {content}
      </motion.span>
    )
  }

  return (
    <>
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="inline-block whitespace-nowrap">
            {perWord ? piece(word, `w${wi}`) : [...word].map((ch, ci) => piece(ch, `${wi}-${ci}`))}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  )
}

export function GlassCard() {
  const { t, lang } = useLang()
  const reduced = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const [liquid, setLiquid] = useState(false)
  const firstRun = useRef(true)

  const spring = { stiffness: 140, damping: 18 }
  const rotateX = useSpring(0, spring)
  const rotateY = useSpring(0, spring)

  useEffect(() => {
    const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } })
      .userAgentData?.brands
    setLiquid(Boolean(brands?.some((b) => /Chromium/i.test(b.brand))))
    firstRun.current = false
  }, [])

  const baseDelay = firstRun.current ? INTRO_DELAY + 0.1 : 0.05
  const isAr = lang === 'ar'

  return (
    <div className="w-full max-w-[640px]" style={{ perspective: 1200 }}>
      <LiquidFilter />
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: INTRO_DELAY - 0.15 }}
        style={{ rotateX, rotateY }}
        onPointerMove={(e) => {
          const el = cardRef.current
          if (!el) return
          const r = el.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width
          const py = (e.clientY - r.top) / r.height
          el.style.setProperty('--mx', `${px * 100}%`)
          el.style.setProperty('--my', `${py * 100}%`)
          if (reduced || e.pointerType !== 'mouse') return
          rotateY.set((px - 0.5) * 12)
          rotateX.set(-(py - 0.5) * 12)
        }}
        onPointerLeave={() => {
          rotateX.set(0)
          rotateY.set(0)
        }}
        className={`glass w-full p-6 sm:p-9 ${liquid ? 'is-liquid' : ''}`}
      >
        <div className="glass-spec" aria-hidden="true" />

        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
          <span className="live-dot shrink-0" aria-hidden="true" />
          {t.hero.eyebrow}
        </p>

        <h1
          key={lang}
          aria-label={t.hero.title}
          className="mt-5 text-balance font-display leading-[1.12] text-bone [font-size:clamp(1.85rem,5.4vw,3.3rem)]"
        >
          <FocusTitle text={t.hero.title} perWord={isAr} baseDelay={baseDelay} />
        </h1>

        <p className="mt-5 max-w-[52ch] text-pretty text-base leading-relaxed text-bone/85">{t.hero.lede}</p>

        <p
          lang={t.hero.secondLang}
          dir={t.hero.secondLang === 'ar' ? 'rtl' : 'ltr'}
          className={`mt-3 text-sm text-haze ${t.hero.secondLang === 'ar' ? 'font-arabic text-base' : 'font-display tracking-wide'}`}
        >
          {t.hero.second}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Magnetic
            href="#get-app"
            className="btn-amber inline-flex h-12 items-center gap-3 rounded-full px-6 text-sm font-semibold"
          >
            {t.hero.cta}
            <span className="rev-arrow" aria-hidden="true">
              <ArrowRight className="size-4 rtl:-scale-x-100" />
            </span>
          </Magnetic>
          <Magnetic
            href="#clubs"
            className="inline-flex h-12 items-center rounded-full border border-ice/20 bg-ice/5 px-6 text-sm font-semibold text-bone backdrop-blur-md transition-colors duration-300 hover:border-ice/35 hover:bg-ice/10"
          >
            {t.hero.ghost}
          </Magnetic>
        </div>
      </motion.div>
    </div>
  )
}
