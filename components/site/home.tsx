// The APEX home page (/ and /ar), built on the design-taste-frontend kit in public/assets.
//
// type: software · deal: hero collage, nav nav-centre, close close-word, footer footer-statement,
// rhythm dark-band (on a dark page: one .ground-inverse chrome band, #partners), buttons pill,
// mark: the client's chrome peak logo. Palette: the client's own (start.mjs brand): #080808 /
// #121518 / #eef2f4 / #9aa4ab / teal #00c8c8. Type: Outfit + DM Mono; IBM Plex Sans Arabic on /ar.
// Effect: grain-gradient in the hero art frame, held still. Moments: line-carries-colour (#card),
// letters-assemble (#partners). The page is a stack of screens: hero, rides, xp, market, card,
// partners, partner, faq, footer.closing.
import { Fragment } from 'react'
import { APP_STORE_URL, type Copy } from '@/lib/site/content'

/** Every picture the page shows, by base name under /img (photos: -640/-1280.webp; screens: -360/-720.webp). */
export const MEDIA = {
  heroScreen: 'screen-fly',
  ridesA: 'screen-home',
  ridesB: 'screen-ridecard',
  marketScreen: 'screen-market',
  marketPhoto: 'standin-riders-mountain', // stand-in: replace with a real APEX photograph
  cardPhoto: 'standin-night-meet', // stand-in: replace with a real APEX photograph of a Ride Stop
  formPhoto: 'standin-convoy', // stand-in: replace with a real APEX photograph at a partner
}
export type Media = typeof MEDIA
import { EnquiryForm } from './enquiry-form'

const Arrow = () => (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
)

function Logo({ c, className = 'nav__logo' }: { c: Copy; className?: string }) {
  return (
    <a className={className} href="#top" aria-label="APEX" dir="ltr">
      <img className="apx-peak" src="/img/apex-peak.svg" alt="" width={32} height={28} />
      <img className="apx-wordmark" src="/img/apex-wordmark.svg" alt="" width={110} height={11} />
    </a>
  )
}

function StoreBadge({ c, id }: { c: Copy; id?: string }) {
  return (
    <a className="apx-badge" href={APP_STORE_URL} id={id} rel="noopener">
      <img src="/img/appstore-en.svg" alt={c.appStoreAlt} width={132} height={44} />
    </a>
  )
}

/** A phone: the real App Store screen inside a drawn device edge (the screenshot is never mirrored). */
function Phone({
  name,
  alt,
  className = '',
  priority = false,
  ping,
}: {
  name: string
  alt: string
  className?: string
  priority?: boolean
  /** a live-location ping drawn over the screen's own map marker, in % of the screen */
  ping?: { x: number; y: number }
}) {
  return (
    <div className={`apx-phone ${className}`} dir="ltr">
      {ping && <span className="apx-ping" style={{ ['--px' as string]: ping.x / 100, ['--py' as string]: ping.y / 100 }} aria-hidden="true" />}
      <img
        src={`/img/${name}-720.webp`}
        srcSet={`/img/${name}-360.webp 360w, /img/${name}-720.webp 720w`}
        sizes="(max-width: 639px) 70vw, 360px"
        alt={alt}
        width={360}
        height={name === 'screen-home' ? 634 : 755}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        data-source="client"
        data-subject="APEX app screen"
      />
    </div>
  )
}

export function Home({ c, media: m = MEDIA }: { c: Copy; media?: Media }) {
  const ar = c.locale === 'ar'
  // the Spotlight bars are drawn against the week's top score; figures in the page's locale (Western digits,
  // as UAE apps print them), with separators
  const topXp = Math.max(1, ...c.xp.spotlight.rows.map((r) => r.xp))
  const fmt = new Intl.NumberFormat(ar ? 'ar-AE-u-nu-latn' : 'en-AE')
  return (
    <>
      <header className="nav nav--centre">
        <div className="wrap nav__bar">
          <a className="skip-link" href="#top">{c.skip}</a>
          <Logo c={c} />
          <nav className="nav__links" aria-label={ar ? 'الرئيسية' : 'Main'}>
            <div className="nav__item"><a className="nav__link" href="#rides">{c.nav.rides}</a></div>
            <div className="nav__item"><a className="nav__link" href="#xp">{c.nav.xp}</a></div>
            <div className="nav__item"><a className="nav__link" href="#market">{c.nav.market}</a></div>
            <div className="nav__item"><a className="nav__link" href="#card">{c.nav.card}</a></div>
            <div className="nav__item">
              <a className="nav__link" href="#partners">
                {c.nav.partners}{' '}
                <svg className="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <div className="nav__menu">
                <div className="wrap grid">
                  <div className="menu-col span-4">
                    <p className="t-label">{c.nav.partnersMenu.label}</p>
                    {c.nav.partnersMenu.items.map((it) => (
                      <a key={it.title} href={it.href}>{it.title}<span>{it.line}</span></a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className="nav__actions">
            <a className="nav__link" href={c.altHome} hrefLang={ar ? 'en' : 'ar'} lang={ar ? 'en' : 'ar'}>{c.altLangLabel}</a>
            <a className="btn btn--primary" href={c.download}>{c.nav.cta}</a>
          </div>
          <button className="nav__toggle" type="button" aria-expanded="false" aria-label={c.nav.menu}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </div>
      </header>

      <main id="top">
        {/* HERO: collage. Words on span-5; the real Home screen in a phone on the lit frame, cut by its foot;
            one small card that loops (a ride saved, +150 XP). */}
        <section className="hero hero--collage" data-enter aria-labelledby="hero-h">
          <div className="wrap"><div className="hero-text grid hero__grid">
            <div className="hero__text span-5">
              <h1 id="hero-h">{c.hero.h1}</h1>
              <p className="hero__lead">{c.hero.lead}</p>
              <div className="btn-row">
                <StoreBadge c={c} />
                <a className="btn btn--secondary" href={c.androidHref}>{c.android}</a>
              </div>
              <p className="hero__proof">{c.hero.proof}</p>
            </div>
            <div className="hero__art span-6 start-7" role="img" aria-label={c.hero.artLabel} data-fx="grain-gradient" data-fx-params='{"drift":0}'>
              <div className="ly-piece ly-piece--main apx-hero-phone" aria-hidden="true">
                <Phone name={m.heroScreen} alt="" priority ping={{ x: 49.6, y: 47.8 }} />
              </div>
              <div className="ly-piece ly-piece--note d-card apx-glass apx-note" aria-hidden="true" data-ly-steps="600">
                <div className="d-card__row"><h5>{c.hero.cardTitle}</h5><span className="d-chip" data-step data-step-at="3"><bdi dir="ltr">{c.hero.cardChip}</bdi></span></div>
                <div className="d-note__line" data-step><i>✓</i><span>{c.hero.cardLines[0]}</span></div>
                <div className="d-note__line" data-step><i>✓</i><span>{c.hero.cardLines[1]}</span></div>
                <div className="d-note__line" data-step><i className="xp">XP</i><span><b>{c.hero.cardLines[2]}</b></span></div>
              </div>
            </div>
          </div></div>
        </section>

        {/* RIDES: split-text-left. The text, then two real screens (Home's next ride, FLY going live) on the lit ground. */}
        <section className="section" id="rides" aria-labelledby="rides-h">
          <div className="wrap">
            <div className="grid grid--top">
              <div className="span-5 stack-6">
                <h2 id="rides-h">{c.rides.h2} <span className="muted">{c.rides.h2m}</span></h2>
                <p className="t-lead">{c.rides.body}</p>
                <ul className="apx-facts">{c.rides.facts.map((f) => <li key={f}>{f}</li>)}</ul>
                <p><a className="link" href={c.download}>{c.rides.link}<Arrow /></a></p>
              </div>
              <div className="frame frame--split frame--lit span-6 start-7 apx-duo" role="img" aria-label={c.rides.artLabel}>
                <Phone name={m.ridesA} alt="" className="apx-duo__a" />
                <Phone name={m.ridesB} alt="" className="apx-duo__b" />
              </div>
            </div>
          </div>
        </section>

        {/* XP: three open cards, each with its own small working visual (the Ride Card, the Spotlight, the share row). */}
        <section className="section" id="xp" aria-labelledby="xp-h" style={{ ['--hm' as string]: 2 }}>
          <div className="wrap">
            <div className="section-head"><h2 id="xp-h">{c.xp.h2} <span className="muted">{c.xp.h2m}</span></h2></div>
            <div className="grid apx-cards">
              <article className="card card--row">
                <h3>{c.xp.cards[0].title}</h3>
                <p>{c.xp.cards[0].body}</p>
                <div className="panel apx-panel" role="img" aria-label={c.xp.rideCardAlt}>
                  <div className="d-card apx-glass apx-ridecard" aria-hidden="true">
                    <p className="apx-ridecard__earned"><bdi dir="ltr">{c.xp.share.xp}</bdi></p>
                    <div className="apx-ridecard__card">
                      <span className="apx-ridecard__brand" dir="ltr">A P E X</span>
                      <span className="apx-ridecard__meta" dir="ltr">RIDE CARD · 09 NOV 2026</span>
                      <span className="apx-ridecard__title">{c.hero.cardTitle}</span>
                    </div>
                  </div>
                </div>
              </article>
              <article className="card card--row">
                <h3>{c.xp.cards[1].title}</h3>
                <p>{c.xp.cards[1].body}</p>
                <div className="panel apx-panel" role="img" aria-label={`${c.xp.spotlight.head}: ${c.xp.spotlight.rows.map((r) => `${r.rank}, ${r.xp} XP`).join('; ')}`}>
                  <div className="d-card apx-glass apx-spot" aria-hidden="true" data-count={topXp < 1000 ? 'on' : 'off'}>
                    <div className="d-card__row"><h5>{c.xp.spotlight.head}</h5><span className="apx-spot__week">{c.xp.spotlight.week}</span></div>
                    {c.xp.spotlight.rows.map((r, i) => (
                      <div className="apx-spot__row" key={r.rank} style={{ ['--v' as string]: `${Math.max(4, Math.round((r.xp / topXp) * 100))}%`, ['--i' as string]: i }}>
                        <span className="apx-spot__rank">{r.rank}</span>
                        <span className="apx-spot__bar"><i /></span>
                        <span className="apx-spot__xp" style={{ ['--xp-to' as string]: r.xp }}><b data-xp={r.xp}>{fmt.format(r.xp)}</b> {c.xp.spotlight.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
              <article className="card card--row">
                <h3>{c.xp.cards[2].title}</h3>
                <p>{c.xp.cards[2].body}</p>
                <div className="panel apx-panel" role="img" aria-label={c.xp.cards[2].body}>
                  <div className="d-card apx-glass apx-share" aria-hidden="true">
                    <div className="d-card__row"><h5>{c.xp.share.saved}</h5><span className="d-chip">{c.xp.share.xp}</span></div>
                    <div className="apx-share__grid">
                      <span className="apx-share__btn"><img src="/assets/icons/instagram.svg" alt="" width={18} height={18} />{c.xp.share.buttons[0]}</span>
                      <span className="apx-share__btn"><img src="/assets/icons/whatsapp.svg" alt="" width={18} height={18} />{c.xp.share.buttons[1]}</span>
                      <span className="apx-share__btn"><svg viewBox="0 0 16 16" width="16" height="16"><path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M3 13h10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{c.xp.share.buttons[2]}</span>
                      <span className="apx-share__btn apx-share__btn--on"><svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="6" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M3 13.5c.8-2.4 2.7-3.6 5-3.6s4.2 1.2 5 3.6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>{c.xp.share.buttons[3]}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* MARKET: chapter. The h2 and a line, then one wide frame (a stand-in photograph with the real Market screen
            over its edge), then four names. */}
        <section className="section" id="market" aria-labelledby="market-h">
          <div className="wrap">
            <div className="grid grid--top">
              <h2 id="market-h" className="span-6">{c.market.h2} <span className="muted">{c.market.h2m}</span></h2>
              <div className="span-6 start-7 stack-4">
                <p className="muted apx-chapter-line">{c.market.body}</p>
                <p><a className="link" href={c.download}>{c.market.link}<Arrow /></a></p>
              </div>
            </div>
            <div className="frame frame--photo apx-wide">
              {/* stand-in: replace with a real APEX photograph */}
              <img
                className="frame__img"
                src={`/img/${m.marketPhoto}-1280.webp`}
                srcSet={`/img/${m.marketPhoto}-640.webp 640w, /img/${m.marketPhoto}-1280.webp 1280w`}
                sizes="(max-width: 639px) 800px, (max-width: 1279px) 100vw, 1280px"
                alt={c.market.photoAlt}
                width={1280}
                height={714}
                loading="lazy"
                decoding="async"
                data-source="library"
                data-subject="riders and sport bikes"
              />
              <Phone name={m.marketScreen} alt={c.market.screenAlt} className="apx-wide__phone" />
            </div>
            <div className="grid apx-names">
              {c.market.names.map((n) => (
                <div className="span-3" key={n.title}><p className="apx-names__t">{n.title}</p><p className="muted">{n.line}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* CARD: split on the surface ground; moment line-carries-colour (a teal scan line climbs the panel). */}
        <section className="section ground-surface" id="card" aria-labelledby="card-h" style={{ ['--hm' as string]: 2 }} data-moment="line-carries-colour" data-moment-opts='{"from":"base"}'>
          <div className="wrap">
            <div className="grid grid--top">
              <div className="span-5 stack-6">
                <h2 id="card-h">{c.card.h2}</h2>
                <p className="t-lead">{c.card.body}</p>
                <dl className="apx-price">
                  <dt>{c.card.priceLabel}</dt>
                  <dd>{c.card.price}</dd>
                </dl>
                <p><a className="link" href={c.download}>{c.nav.cta}<Arrow /></a></p>
              </div>
              <div className="frame frame--photo frame--split span-6 start-7 apx-cardframe">
                {/* stand-in: replace with a real APEX photograph of a Ride Stop */}
                <img
                  className="frame__img"
                  src={`/img/${m.cardPhoto}-1280.webp`}
                  srcSet={`/img/${m.cardPhoto}-640.webp 640w, /img/${m.cardPhoto}-1280.webp 1280w`}
                  sizes="(max-width: 639px) 1200px, (max-width: 1023px) 100vw, 1120px"
                  alt={c.card.photoAlt}
                  width={1280}
                  height={714}
                  loading="lazy"
                  decoding="async"
                  data-source="library"
                  data-subject="night meet at the marina"
                />
                <div className="d-card apx-glass apx-qr" role="img" aria-label={c.card.qr.label} data-apx-qr>
                  <p className="apx-qr__show">{c.card.qr.show}</p>
                  <img className="apx-qr__code" src="/img/apex-card-qr.svg" alt="" width={132} height={132} />
                  <p className="apx-qr__num" dir="ltr" data-apx-code>{c.card.qr.code}</p>
                  <span className="apx-qr__bar"><i /></span>
                  <p className="apx-qr__next">{c.card.qr.next} <span data-apx-sec>6</span>s</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERS: the dark band (on this dark page, the chrome inverse ground); moment letters-assemble on the one
            partner promise. No percentages: the owner's rates are subject to revision. */}
        <section
          className="section ground-inverse"
          id="partners"
          aria-labelledby="partners-h"
          style={{ ['--hm' as string]: 2 }}
          // letters-assemble splits a statement into one box per letter, which breaks Arabic joining: on /ar the
          // statement stands as written (the moment's own rest state).
          data-moment={ar ? undefined : 'letters-assemble'}
        >
          <div className="wrap">
            <div className="grid grid--top apx-partners-grid">
              <div className="span-7">
                <h2 id="partners-h" className="mo-la__type">{c.partners.statement}</h2>
                <p className="mo-la__sub">{c.partners.sub}</p>
              </div>
              <div className="span-4 start-9 apx-dealerframe" role="img" aria-label={c.partners.screenAlt}>
                <div className="d-card apx-glass apx-dash" aria-hidden="true">
                  <div className="d-card__row"><h5>{c.partners.dash.title}</h5><span className="apx-dash__range">{c.partners.dash.range}</span></div>
                  <ul className="apx-dash__grid">
                    {c.partners.dash.items.map((it) => (
                      <li key={it}><span className="apx-dash__tick" aria-hidden="true" />{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {c.partners.cols.map((col, i) => (
                <div className={`span-3 stack-4 apx-partners-col${i === 1 ? ' start-4' : ''}`} key={col.title}>
                  <h3>{col.title}</h3>
                  <p>
                    {col.body}
                    {col.assumed ? <> <span data-assumed>{col.assumed}</span></> : null}
                  </p>
                </div>
              ))}
              <p className="span-7 apx-partners__cta"><a className="btn btn--secondary" href="#partner">{c.partners.button}</a></p>
            </div>
          </div>
        </section>

        {/* PARTNER: the enquiry form beside the dealer dashboard (the real screen) and a stand-in photograph. */}
        <section className="section" id="partner" aria-labelledby="partner-h" style={{ ['--hm' as string]: 2 }}>
          <div className="wrap">
            <div className="grid grid--top">
              <div className="span-6 stack-6">
                <h2 id="partner-h">{c.form.h2} <span className="muted">{c.form.h2m}</span></h2>
                <EnquiryForm c={c} />
              </div>
              <div className="frame frame--photo span-6 start-7 apx-formframe">
                {/* stand-in: replace with a real APEX photograph at a partner */}
                <img
                  className="frame__img"
                  src={`/img/${m.formPhoto}-1280.webp`}
                  srcSet={`/img/${m.formPhoto}-640.webp 640w, /img/${m.formPhoto}-1280.webp 1280w`}
                  sizes="(max-width: 639px) 1200px, (max-width: 1023px) 100vw, 1120px"
                  alt={c.form.photoAlt}
                  width={1280}
                  height={714}
                  loading="lazy"
                  decoding="async"
                  data-source="library"
                  data-subject="supercar convoy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ: the page's split; every answer open. */}
        <section className="section" id="faq" aria-labelledby="faq-h" style={{ ['--hm' as string]: 2 }}>
          <div className="wrap">
            <div className="grid grid--top">
              <div className="span-5 stack-4">
                <h2 id="faq-h">{c.faq.h2}</h2>
                <p className="muted">{c.faq.line}</p>
                <p><a className="link" href="/concierge">{c.faq.link}<Arrow /></a></p>
                <div className="d-card apx-install">
                  <div className="apx-install__head">
                    <span className="apx-install__icons" aria-hidden="true">
                      <img src="/assets/icons/android.svg" alt="" width={40} height={23} />
                      <img src="/assets/icons/chrome.svg" alt="" width={28} height={28} />
                    </span>
                    <h3 className="apx-install__title">{c.faq.install.title}</h3>
                  </div>
                  <ol className="apx-install__steps">
                    {c.faq.install.steps.map((st, i) => (
                      <li key={st}><span className="apx-install__n" aria-hidden="true">{i + 1}</span><span>{st}</span></li>
                    ))}
                  </ol>
                  <p><a className="link" href={c.androidHref}>{c.faq.install.link}<Arrow /></a></p>
                </div>
              </div>
              <div className="faq span-6 start-7">
                {c.faq.items.map((it) => (
                  <div className="faq__item" key={it.q}>
                    <h3>{it.q}</h3>
                    <p>
                      {it.a}
                      {it.link ? <> <a className="apx-inline" href={it.link.href}>{it.link.label}</a>{it.link.after}</> : null}
                      {it.assumedTail ? <> <span data-assumed>{it.assumedTail}</span></> : null}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer closing footer--statement" id="contact" aria-labelledby="close-h">
        <div className="wrap">
          <div className="closing__cta close--word">
            <div className="section-head--split">
              <div><h2 id="close-h">{c.close.h2}</h2><p className="t-lead">{c.close.line}</p></div>
              <div className="btn-row">
                <StoreBadge c={c} />
                <a className="btn btn--secondary" href={c.androidHref}>{c.android}</a>
              </div>
            </div>
            <p className="close__word" aria-hidden="true"><img src="/img/apex-wordmark.svg" alt="" width={1280} height={130} loading="lazy" /></p>
          </div>
          <div className="closing__links">
            <div className="grid">
              <div className="span-4 stack-4">
                <Logo c={c} />
                <p className="footer__lede">{c.footer.lede}</p>
              </div>
              {c.footer.cols.map((col, i) => (
                <div className={`span-2 footer__col${i === 0 ? ' start-7' : ''}`} key={col.title}>
                  <h3>{col.title}</h3>
                  <ul>{col.links.map((l) => <li key={l.href + l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
                </div>
              ))}
            </div>
            <div className="footer__legal">
              <span>{c.footer.rights}{c.footer.legal.map((l) => <Fragment key={l.href}> &nbsp; <a href={l.href}>{l.label}</a></Fragment>)}</span>
              <a href={c.altHome} hrefLang={ar ? 'en' : 'ar'} lang={ar ? 'en' : 'ar'}>{c.altLangLabel}</a>
            </div>
          </div>
        </div>
      </footer>

      <nav className="actionbar" aria-label={ar ? 'إجراءات سريعة' : 'Quick actions'}>
        {/* its own address, so the kit only steps the bar aside for the same action, not for every /download link */}
        <a className="btn btn--primary" href={`${c.download}?from=bar`}>{c.nav.cta}</a>
      </nav>
    </>
  )
}
