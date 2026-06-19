import type { ComponentProps } from 'react'

type Variant = 'white' | 'gold'

const base =
  'group relative inline-flex items-center justify-center px-9 py-4 text-[9px] font-bold uppercase tracking-[0.4em] transition-colors duration-500 ease-out'

const variants: Record<Variant, string> = {
  white:
    'border border-white/70 text-white hover:bg-white hover:text-carbon hover:border-white',
  gold: 'border border-gold/70 text-gold hover:bg-gold hover:text-carbon hover:border-gold',
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
