'use client'

// Loads the kit's scripts (system.js, motion.js, layout.js) once React has hydrated the page. They
// change the DOM (nav state, moment letter spans, hero entrance classes); run before hydration, React
// would find HTML it did not render (error #418) and throw the server markup away. After hydration the
// server-rendered parts are never re-rendered, so the kit's changes stay.
import { useEffect } from 'react'

const SCRIPTS = ['/assets/system.js', '/assets/motion/motion.js', '/assets/layout/layout.js']

export function KitScripts() {
  useEffect(() => {
    for (const src of SCRIPTS) {
      if (document.querySelector(`script[data-kit="${src}"]`)) continue
      const s = document.createElement('script')
      s.type = 'module'
      s.src = src
      s.dataset.kit = src
      document.body.append(s)
    }
  }, [])
  return null
}
