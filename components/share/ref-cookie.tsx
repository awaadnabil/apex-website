'use client'

import { useEffect } from 'react'
import { REF_COOKIE, REF_COOKIE_MAX_AGE } from '@/lib/share/links'

/**
 * Remembers who shared the link. The ref (a user id) is already on the store, download and deep links of
 * this page; the cookie is for the visitor who installs now and lands on /join later, after the query
 * string is long gone. First-party, a month, no JS reads it here.
 */
export function RefCookie({ value }: { value: string | null }) {
  useEffect(() => {
    if (!value) return
    try {
      const secure = location.protocol === 'https:' ? '; Secure' : ''
      document.cookie = `${REF_COOKIE}=${encodeURIComponent(value)}; Max-Age=${REF_COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`
    } catch {
      /* cookies off: the links still carry the ref */
    }
  }, [value])
  return null
}
