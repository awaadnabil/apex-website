import { headers } from 'next/headers'
import { userAgent } from 'next/server'

export type Platform = 'ios' | 'android' | 'other'

/** Read on the server from the request's User-Agent, so the right store link is in the first paint. */
export async function detectPlatform(): Promise<Platform> {
  try {
    const { os, ua } = userAgent({ headers: await headers() })
    const name = (os.name ?? '').toLowerCase()
    if (name === 'android') return 'android'
    if (name === 'ios' || /iphone|ipad|ipod/i.test(ua)) return 'ios'
    // iPadOS asks for the desktop site; Safari on a Mac without a mouse is an iPad
    if (name.includes('mac') && /mobile/i.test(ua)) return 'ios'
    return 'other'
  } catch {
    return 'other'
  }
}
