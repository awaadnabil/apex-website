'use client'

import { useRef, type ComponentProps } from 'react'

type Variant = 'white' | 'solid'

const base =
  'group relative inline-flex items-center justify-center overflow-hidden px-9 py-4 text-[9px] font-bold uppercase tracking-[0.4em] transition-[background-color,color,border-color,transform] duration-500 ease-out [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]'

const variants: Record<Variant, string> = {
  // White border only — the restrained default.
  white: 'border border-white/70 text-white hover:bg-white hover:text-carbon hover:border-white',
  // The one filled button on the page — reserved for the Carbon tier CTA.
  solid: 'bg-white text-carbon hover:bg-white/90',
}

export function ApexButton({
  variant = 'white',
  className = '',
  children,
  ...props
}: { variant?: Variant } & ComponentProps<'a'>) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * 0.3
    const y = (e.clientY - (r.top + r.height / 2)) * 0.4
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate3d(0,0,0)'
  }

  return (
    <a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* sheen sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
    </a>
  )
}
