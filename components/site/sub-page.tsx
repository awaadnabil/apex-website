// The shell every kit sub-page shares (/ar/download, /pricing, /refunds and their /ar versions, /ar/terms):
// the logo bar with the other language's link, the page in main.apx-sub, and the footer with the home link
// and the legal links (Pricing, Refunds, Terms, Privacy).
import type { Copy } from '@/lib/site/content'

export function SubPage({
  c,
  altHref,
  children,
}: {
  c: Copy
  /** the same page in the other language */
  altHref: string
  children: React.ReactNode
}) {
  const ar = c.locale === 'ar'
  return (
    <>
      <header className="nav">
        <div className="wrap nav__bar">
          <a className="skip-link" href="#top">{c.skip}</a>
          <a className="nav__logo" href={c.home} aria-label="APEX" dir="ltr">
            <img className="apx-peak" src="/img/apex-peak.svg" alt="" width={32} height={28} />
            <img className="apx-wordmark" src="/img/apex-wordmark.svg" alt="" width={110} height={11} />
          </a>
          <div className="nav__actions">
            <a className="nav__link" href={altHref} hrefLang={ar ? 'en' : 'ar'} lang={ar ? 'en' : 'ar'}>{c.altLangLabel}</a>
          </div>
        </div>
      </header>
      <main id="top" className="apx-sub">{children}</main>
      <SubFooter c={c} />
    </>
  )
}

export function SubFooter({ c }: { c: Copy }) {
  return (
    <footer className="apx-sub__foot">
      <div className="wrap">
        <span>{c.footer.rights}</span>
        <a href={c.home}>{c.footer.homeLabel}</a>
        {c.footer.legal.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>
    </footer>
  )
}
