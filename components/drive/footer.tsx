'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useLang } from '@/lib/drive/i18n'
import { LangToggle, Wordmark } from './top-bar'

// Swap these for the live store listings once the app is published.
const APP_STORE_URL = 'https://www.apple.com/app-store/'
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps'
const PRIVACY_URL = 'https://getapexmena.com/privacy'

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
  )
}

function StoreBadge({ href, top, name, icon }: { href: string; top: string; name: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-14 items-center gap-3 rounded-2xl border border-ice/20 bg-dune px-5 text-bone transition-colors duration-300 hover:border-ice/40 hover:bg-ice/10"
    >
      {icon}
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] text-haze">{top}</span>
        <span dir="ltr" className="text-base font-semibold">
          {name}
        </span>
      </span>
    </a>
  )
}

export function Footer() {
  const { t } = useLang()
  const link = 'transition-colors duration-300 hover:text-bone'

  return (
    <footer id="get-app" className="relative border-t border-ice/10 px-4 pb-28 pt-24 sm:px-8 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <p className="max-w-[18ch] text-balance font-display leading-tight text-bone [font-size:clamp(1.9rem,6vw,4rem)]">
          {t.footer.line}
        </p>
        <p className="mt-5 text-base leading-relaxed text-haze">{t.footer.body}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <StoreBadge href={APP_STORE_URL} top={t.footer.appStoreTop} name={t.footer.appStore} icon={<AppleIcon />} />
          <StoreBadge href={GOOGLE_PLAY_URL} top={t.footer.playTop} name={t.footer.play} icon={<PlayIcon />} />
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-ice/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Wordmark className="text-sm text-bone" />
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-6 gap-y-4 font-mono text-[11px] uppercase tracking-[0.16em] text-haze"
          >
            <Link href="/membership" className={link}>
              {t.footer.membership}
            </Link>
            <Link href="/concierge" className={link}>
              {t.footer.concierge}
            </Link>
            <a href={PRIVACY_URL} className={link}>
              {t.footer.privacy}
            </a>
            <LangToggle />
          </nav>
        </div>
        <p className="mt-8 font-mono text-[11px] text-haze">{t.footer.rights}</p>
      </div>
    </footer>
  )
}
