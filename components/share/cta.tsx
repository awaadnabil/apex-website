// The one action on a share page. iPhone goes to the App Store, Android to /download (the APK), anything
// else (a laptop) to the App Store with the Android link underneath. Every link carries the ref.
import type { ShareLinks } from '@/lib/share/links'
import type { ShareCopy } from '@/lib/share/copy'
import type { Platform } from '@/lib/share/platform'

export function ShareCta({ links, label, c, platform }: { links: ShareLinks; label: string; c: ShareCopy; platform: Platform }) {
  const primary = platform === 'android' ? links.download : links.appStore
  return (
    <div className="apx-share__cta">
      <a className="btn btn--primary btn--xl" href={primary} rel={platform === 'android' ? undefined : 'noopener'} data-platform={platform}>
        {label}
      </a>
      <p className="muted">{c.ctaNote}</p>
      <a className="apx-inline" href={links.deepLink}>{c.openApp}</a>
    </div>
  )
}
