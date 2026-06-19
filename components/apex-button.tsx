import type { ComponentProps } from 'react'

type Variant = 'white' | 'solid'

const base =
  'group relative inline-flex items-center justify-center px-9 py-4 text-[9px] font-bold uppercase tracking-[0.4em] transition-colors duration-500 ease-out'

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
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  )
}
