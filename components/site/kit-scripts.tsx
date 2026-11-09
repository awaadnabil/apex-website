'use client'

// Loads the kit's scripts (system.js, motion.js, layout.js) once React has hydrated the page. They
// change the DOM (nav state, moment letter spans, hero entrance classes); run before hydration, React
// would find HTML it did not render (error #418) and throw the server markup away. After hydration the
// server-rendered parts are never re-rendered, so the kit's changes stay.
import { useEffect } from 'react'

const SCRIPTS = ['/assets/system.js', '/assets/motion/motion.js', '/assets/layout/layout.js']

export function KitScripts() {
  useEffect(() => {
    // the kit labels its pause/play control in English; on Arabic pages say it in Arabic
    let mo: MutationObserver | undefined
    if (document.documentElement.lang === 'ar') {
      const AR: Record<string, string> = { 'Pause animation': 'إيقاف الحركة مؤقتاً', 'Play animation': 'تشغيل الحركة' }
      const fix = () =>
        document.querySelectorAll<HTMLElement>('.loop-pause, .ui-pause, header.nav [aria-label]').forEach((b) => {
          const l = b.getAttribute('aria-label') ?? ''
          if (AR[l]) { b.setAttribute('aria-label', AR[l]); b.title = AR[l] }
          // the kit names a nav word's menu button "Show <word> links"
          const m = l.match(/^(Show|Hide) (.+) links$/)
          if (m) b.setAttribute('aria-label', `${m[1] === 'Show' ? 'إظهار' : 'إخفاء'} روابط ${m[2]}`)
        })
      mo = new MutationObserver(fix)
      mo.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['aria-label'] })
    }
    // a picture that fails to load (a deleted or renamed upload) keeps its box but is hidden, so its frame's
    // lit ground shows instead of the browser's broken-image icon and raw alt text
    const broken = (img: HTMLImageElement) => img.setAttribute('data-broken', '')
    const onError = (e: Event) => { if (e.target instanceof HTMLImageElement) broken(e.target) }
    document.addEventListener('error', onError, true)
    document.querySelectorAll('img').forEach((img) => { if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) broken(img) })
    for (const src of SCRIPTS) {
      if (document.querySelector(`script[data-kit="${src}"]`)) continue
      const s = document.createElement('script')
      s.type = 'module'
      s.src = src
      s.dataset.kit = src
      document.body.append(s)
    }
    return () => { mo?.disconnect(); document.removeEventListener('error', onError, true) }
  }, [])
  return null
}
