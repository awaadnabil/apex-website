'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useLang } from '@/lib/drive/i18n'

export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLang()
  const base = 'rounded-full px-2.5 py-1 transition-colors duration-300'
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      lang="en"
      className={`flex items-center rounded-full border border-ice/15 bg-night/40 p-0.5 font-mono text-[11px] ${className}`}
    >
      <button
        type="button"
        lang="en"
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
        className={`${base} ${lang === 'en' ? 'bg-amber text-night' : 'text-haze hover:text-bone'}`}
      >
        EN
      </button>
      <button
        type="button"
        lang="ar"
        aria-pressed={lang === 'ar'}
        onClick={() => setLang('ar')}
        className={`${base} font-arabic ${lang === 'ar' ? 'bg-amber text-night' : 'text-haze hover:text-bone'}`}
      >
        عربي
      </button>
    </div>
  )
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span dir="ltr" lang="en" className={`font-display tracking-[0.42em] ${className}`}>
      A<span className="text-amber">P</span>EX
    </span>
  )
}

export function TopBar() {
  const { t } = useLang()
  const { scrollY } = useScroll()
  const backdrop = useTransform(scrollY, [0, 140], [0, 1])

  const link = 'font-mono text-[11px] uppercase tracking-[0.16em] text-haze transition-colors duration-300 hover:text-bone'

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden="true"
        style={{ opacity: backdrop }}
        className="absolute inset-0 border-b border-ice/10 bg-night/70 backdrop-blur-xl"
      />
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <a href="#top" aria-label={t.nav.home} className="text-sm text-bone">
          <Wordmark />
        </a>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-7">
          <Link href="/membership" className={link}>
            {t.nav.membership}
          </Link>
          <Link href="/concierge" className={`${link} hidden sm:inline`}>
            {t.nav.concierge}
          </Link>
          <Link href="/privacy" className={`${link} hidden md:inline`}>
            {t.nav.privacy}
          </Link>
          <LangToggle />
        </nav>
      </div>
    </header>
  )
}
