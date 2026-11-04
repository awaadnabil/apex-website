'use client'

import { useEffect, useState } from 'react'
import { ApexButton } from '@/components/apex-button'

const APP_STORE_URL = 'https://apps.apple.com/app/apex-mena/id6773114294'

export function ClubInviteRedirect({ code }: { code: string }) {
  const [showFallback, setShowFallback] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)

  useEffect(() => {
    setIsAndroid(/android/i.test(navigator.userAgent))
    window.location.href = `apex://c/${encodeURIComponent(code)}`
    const timer = setTimeout(() => setShowFallback(true), 2000)
    return () => clearTimeout(timer)
  }, [code])

  if (!showFallback) {
    return (
      <div className="reveal mt-14 flex flex-col items-center gap-5">
        <span
          aria-hidden="true"
          className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white"
        />
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Opening APEX&hellip;</p>
      </div>
    )
  }

  return (
    <div className="reveal mt-14 flex flex-col items-center gap-6">
      <ApexButton href={`apex://c/${encodeURIComponent(code)}`} variant="solid">
        Open in APEX
      </ApexButton>
      <ApexButton href={isAndroid ? '/download' : APP_STORE_URL} variant="solid">
        {isAndroid ? 'Download APEX for Android' : 'Download APEX on iOS'}
      </ApexButton>
      <p className="max-w-xs text-[11px] uppercase leading-relaxed tracking-[0.3em] text-white/40">
        Install APEX, then open this link again to join the club.
      </p>
    </div>
  )
}
