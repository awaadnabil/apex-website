// The <html> shell for the kit pages (/ , /ar, /ar/download): the kit's stylesheets (mirrored copies on
// RTL), the client's palette as start.mjs printed it (brand: #080808 / #121518 / #eef2f4 / #9aa4ab / teal),
// the dealt type self-hosted through next/font (Outfit, DM Mono; IBM Plex Sans Arabic on Arabic pages),
// the hero-entrance guard, and the kit's scripts at the end of <body>.
import { dmMono, outfit } from '@/lib/site/fonts'
import { Analytics } from '@vercel/analytics/next'
import type { Locale } from '@/lib/site/content'
import { KitScripts } from './kit-scripts'


const KIT_CSS = [
  'system.css',
  'ui/cards.css',
  'motion/motion.css',
  'backgrounds/backgrounds.css',
  'layout/layout.css',
  'icons/icon.css',
]

// :root as `start.mjs brand --page software --bg #080808 --ink #EEF2F4 --accent #00C8C8 --surface #121518
// --muted #9AA4AB --type outfit --radius round` printed it. The families are named directly, not through
// next/font's variables: those carry a generated "Outfit Fallback" (local Arial, every code point), which
// caught the Arabic glyphs before IBM Plex Sans Arabic. Outfit's own faces cover Latin only, so Arabic
// falls through to Plex (loaded on Arabic pages only).
const PALETTE = `:root {
  --p-bg: #080808; --p-surface: #121518; --p-ink: #eef2f4; --p-muted: #9aa4ab;
  --p-accent: #00c8c8; --p-accent-ink: #080808; --p-action: #00c8c8; --p-action-ink: #080808;
  --p-inv-bg: #eef2f4; --p-inv-surface: #dbdfe1; --p-inv-ink: #080808; --p-inv-muted: #535555;
  --p-inv-accent: #080808; --p-inv-accent-ink: #eef2f4; --p-inv-action: #080808; --p-inv-action-ink: #eef2f4;
  --font-display: "Outfit", "IBM Plex Sans Arabic", system-ui, sans-serif;
  --font-text: "Outfit", "IBM Plex Sans Arabic", system-ui, sans-serif;
  --font-mono: "DM Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --display-weight: 400;
  --display-tracking: -0.03em;
  --display-tracking-xl: -0.04em;
}`

export function KitDocument({
  locale,
  extraFontClass = '',
  children,
}: {
  locale: Locale
  /** the Arabic layout passes IBM Plex Sans Arabic's variable class; English pages never load it */
  extraFontClass?: string
  children: React.ReactNode
}) {
  const rtl = locale === 'ar'
  const base = rtl ? '/assets/rtl/' : '/assets/'
  const fonts = [outfit.variable, dmMono.variable, extraFontClass].filter(Boolean).join(' ')
  return (
    <html
      lang={locale}
      dir={rtl ? 'rtl' : 'ltr'}
      className={fonts}
      data-type="software"
      data-radius="round"
      data-ground="apex"
      data-buttons="pill"
      data-motion=""
      suppressHydrationWarning
    >
      <head>
        <meta name="site-kind" content="software" />
        <meta name="page-type" content="software" />
        {KIT_CSS.map((f) => (
          <link key={f} rel="stylesheet" href={`${base}${f}`} precedence="kit" />
        ))}
        <style dangerouslySetInnerHTML={{ __html: PALETTE }} />
        <link rel="stylesheet" href="/site/apex.css" precedence="page" />
        {/* the hero's entrance: set before first paint so its words wait for motion.js; the 700ms mark
            fades them in if the script is late */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('m-enter');setTimeout(function(){document.documentElement.classList.add('m-enter-done')},700);" +
              "document.documentElement.classList.add('mo-js');setTimeout(function(){document.documentElement.classList.add('mo-safe')},2500);",
          }}
        />
        <script src="/assets/backgrounds/backgrounds.js" />
        <link rel="modulepreload" href="/assets/system.js" />
        <link rel="modulepreload" href="/assets/moments/moments.js" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <KitScripts />
        {/* Vercel serves /_vercel/insights only on its own deployments; locally the script would 404 */}
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
