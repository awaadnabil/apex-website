'use client'

import { useEffect, useState } from 'react'
import { ApexButton } from '@/components/apex-button'

const APP_STORE_URL = 'https://apps.apple.com/app/apex-mena/id6773114294'

export function JoinRedirect({
  referrerId,
  code,
}: {
  referrerId: string
  code: string
}) {
  const [showFallback, setShowFallback] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    window.location.href = `apex://join/${referrerId}`

    const timer = setTimeout(() => {
      setShowFallback(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [referrerId])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  if (!showFallback) {
    return (
      <div className="reveal mt-14 flex flex-col items-center gap-5">
        <span
          aria-hidden="true"
          className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white"
        />
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
          Opening APEX&hellip;
        </p>
      </div>
    )
  }

  return (
    <div className="reveal mt-14 flex w-full max-w-sm flex-col items-center gap-10">
      <div className="flex w-full flex-col items-center border border-white/10 px-8 py-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
          Invite code
        </p>
        <p className="mt-4 font-mono text-[26px] font-bold tracking-[0.18em] text-white">
          {code}
        </p>
        <button
          type="button"
          onClick={copy}
          className="mt-5 text-[10px] uppercase tracking-[0.3em] text-teal transition-opacity duration-300 hover:opacity-70"
        >
          {copied ? 'Copied' : 'Copy code'}
        </button>
      </div>

      <p className="max-w-xs text-[13px] leading-relaxed text-white/50">
        Enter this code when you sign up so your invite is credited.
      </p>

      <ApexButton href={APP_STORE_URL} variant="solid">
        Download APEX on iOS
      </ApexButton>

      <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
        Already have APEX? The link opens it automatically.
      </p>
    </div>
  )
}
