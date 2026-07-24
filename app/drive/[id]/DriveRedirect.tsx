'use client'

import { useEffect, useState } from 'react'
import { ApexButton } from '@/components/apex-button'

const APP_STORE_URL = 'https://apps.apple.com/app/apex-mena/id6773114294'

export function DriveRedirect({ driveId }: { driveId: string }) {
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    window.location.href = `apex://drive/${driveId}`

    const timer = setTimeout(() => {
      setShowFallback(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [driveId])

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
    <div className="reveal mt-14 flex flex-col items-center gap-8">
      <ApexButton href={APP_STORE_URL} variant="solid">
        Download APEX on iOS
      </ApexButton>
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
        Already have APEX? The link will open automatically.
      </p>
    </div>
  )
}
