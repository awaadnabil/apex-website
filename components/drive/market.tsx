'use client'

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '@/lib/drive/i18n'

const GAP = 24
const CARD_WIDTH = 'min(76vw, 440px)'

const LISTINGS = [
  { img: '/market/gtr.png', en: 'Nissan GT-R', ar: 'نيسان GT-R', year: 2021, km: '18,400', city: 'DXB', price: '389,000', routes: 64 },
  { img: '/market/gt3.png', en: 'Porsche 911 GT3', ar: 'بورشه 911 GT3', year: 2023, km: '6,200', city: 'AUH', price: '915,000', routes: 31 },
  { img: '/market/patrol.png', en: 'Nissan Patrol Nismo', ar: 'نيسان باترول نيسمو', year: 2022, km: '24,900', city: 'RAK', price: '329,000', routes: 88 },
  { img: '/market/g63.png', en: 'Mercedes-AMG G 63', ar: 'مرسيدس AMG G 63', year: 2022, km: '21,300', city: 'DXB', price: '689,000', routes: 47 },
  { img: '/market/supra.png', en: 'Toyota GR Supra', ar: 'تويوتا GR سوبرا', year: 2021, km: '29,800', city: 'SHJ', price: '189,000', routes: 112 },
  { img: '/market/lc70.png', en: 'Land Cruiser 70', ar: 'لاند كروزر 70', year: 2020, km: '61,000', city: 'FUJ', price: '205,000', routes: 153 },
]

type Listing = (typeof LISTINGS)[number]

function MarketCard({
  item,
  index,
  x,
  step,
  measureRef,
}: {
  item: Listing
  index: number
  x: MotionValue<number>
  step: number
  measureRef?: React.Ref<HTMLElement>
}) {
  const { t, lang, dir } = useLang()
  const distance = useTransform(x, (v) => (step ? Math.min(Math.abs(v + index * step) / step, 2) : 0))
  const scale = useTransform(distance, [0, 1, 2], [1, 0.86, 0.78])
  const opacity = useTransform(distance, [0, 1, 2], [1, 0.5, 0.28])
  const filter = useTransform(distance, (d) => `blur(${(d * 3.5).toFixed(2)}px)`)
  const name = lang === 'ar' ? item.ar : item.en
  const price = lang === 'ar' ? `${item.price} ${t.market.currency}` : `${t.market.currency} ${item.price}`

  return (
    <motion.article
      ref={measureRef}
      dir={dir}
      style={{ scale, opacity, filter, width: CARD_WIDTH }}
      className="shrink-0 select-none"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-ice/10 bg-dune">
        <Image
          src={item.img}
          alt={`${item.en}, ${item.year}`}
          fill
          sizes="(max-width: 640px) 76vw, 440px"
          draggable={false}
          className="pointer-events-none object-cover"
        />
        <span className="absolute start-3 top-3 rounded-full bg-night/75 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-bone backdrop-blur">
          {item.city}
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-[15px] leading-snug text-bone">{name}</h3>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-haze">
            {t.market.year} {item.year} · {item.km} km · {item.routes} {t.market.routes}
          </p>
        </div>
        <p className="whitespace-nowrap font-mono text-sm text-amber">{price}</p>
      </div>
    </motion.article>
  )
}

export function Market() {
  const { t, lang } = useLang()
  const isAr = lang === 'ar'
  // The track is always laid out LTR; in Arabic the order is mirrored so the first listing sits on the right.
  const items = useMemo(() => (isAr ? [...LISTINGS].reverse() : LISTINGS), [isAr])
  const count = items.length
  const startIndex = isAr ? count - 1 : 0

  const x = useMotionValue(0)
  const measureRef = useRef<HTMLElement>(null)
  const indexRef = useRef(startIndex)
  const [step, setStep] = useState(0)
  const [index, setIndex] = useState(startIndex)

  useEffect(() => {
    const el = measureRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setStep(el.offsetWidth + GAP))
    ro.observe(el)
    return () => ro.disconnect()
  }, [isAr])

  useEffect(() => {
    if (step) x.set(-indexRef.current * step)
  }, [step, x])

  useEffect(() => {
    indexRef.current = startIndex
    setIndex(startIndex)
    if (step) x.set(-startIndex * step)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAr])

  useMotionValueEvent(x, 'change', (v) => {
    if (!step) return
    const i = Math.max(0, Math.min(count - 1, Math.round(-v / step)))
    if (i !== indexRef.current) {
      indexRef.current = i
      setIndex(i)
    }
  })

  const go = (i: number) => {
    const clamped = Math.max(0, Math.min(count - 1, i))
    animate(x, -clamped * step, { type: 'spring', stiffness: 260, damping: 34 })
  }

  const forward = isAr ? -1 : 1
  const hasNext = index + forward >= 0 && index + forward < count
  const hasPrev = index - forward >= 0 && index - forward < count

  const navBtn =
    'inline-flex size-11 items-center justify-center rounded-full border border-ice/20 text-bone transition-colors duration-300 hover:border-ice/40 hover:bg-ice/10 disabled:pointer-events-none disabled:opacity-30'

  return (
    <section id="market" aria-labelledby="market-title" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">{t.market.eyebrow}</p>
          <h2 id="market-title" className="mt-4 text-balance font-display leading-tight text-bone [font-size:clamp(1.5rem,3.6vw,2.6rem)]">
            {t.market.title}
          </h2>
          <p className="mt-5 max-w-[46ch] text-pretty text-base leading-relaxed text-haze">{t.market.body}</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" aria-label={t.market.prev} onClick={() => go(index - forward)} disabled={!hasPrev} className={navBtn}>
            <ChevronLeft aria-hidden="true" className="size-5 rtl:-scale-x-100" />
          </button>
          <button type="button" aria-label={t.market.next} onClick={() => go(index + forward)} disabled={!hasNext} className={navBtn}>
            <ChevronRight aria-hidden="true" className="size-5 rtl:-scale-x-100" />
          </button>
        </div>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={t.market.label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(index + 1)
          if (e.key === 'ArrowLeft') go(index - 1)
        }}
        className="mt-14 w-full overflow-hidden py-2"
      >
        <motion.div
          dir="ltr"
          drag="x"
          dragConstraints={{ left: -(count - 1) * step, right: 0 }}
          dragElastic={0.1}
          dragTransition={{
            power: 0.3,
            timeConstant: 240,
            modifyTarget: (v) => (step ? Math.round(v / step) * step : v),
          }}
          style={{ x, gap: GAP, paddingInline: `calc(50% - ${CARD_WIDTH} / 2)` }}
          className="flex w-max cursor-grab touch-pan-y active:cursor-grabbing"
        >
          {items.map((item, i) => (
            <MarketCard
              key={item.img}
              item={item}
              index={i}
              x={x}
              step={step}
              measureRef={i === 0 ? measureRef : undefined}
            />
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl items-center justify-between gap-4 px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-haze sm:px-8">
        <span>{t.market.hint}</span>
        <span>{t.market.note}</span>
      </div>
    </section>
  )
}
