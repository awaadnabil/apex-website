// /dealer/[id] and /ar/dealer/[id]: a partner (dealer or Ride Stop) as the person who got the link sees it,
// without the app. The perk every rider gets is the hero; the members' extra sits under it; the one
// action is installing APEX. Never a fee rate: the RPC does not return one and nothing here prints one.
import { COPY, type Locale } from '@/lib/site/content'
import { SHARE_COPY } from '@/lib/share/copy'
import { directionsUrl, instagramUrl, shareLinks, websiteUrl, whatsappUrl } from '@/lib/share/links'
import type { PublicPartner } from '@/lib/share/supabase'
import type { Platform } from '@/lib/share/platform'
import { SubPage } from '@/components/site/sub-page'
import { ShareCta } from './cta'
import { RefCookie } from './ref-cookie'
import { CheckIcon, GlobeIcon, InstagramIcon, LockIcon, PinIcon, WhatsAppIcon } from './icons'

export function PartnerSharePage({ partner, locale, referrer, platform }: { partner: PublicPartner; locale: Locale; referrer: string | null; platform: Platform }) {
  const c = COPY[locale]
  const s = SHARE_COPY[locale]
  const links = shareLinks('dealer', partner.id, locale, referrer)
  const kind = partner.partner_type === 'ride_stop' ? s.kind.ride_stop : s.kind.dealer
  const channels = [
    { href: directionsUrl(partner), label: s.directions, Icon: PinIcon },
    { href: instagramUrl(partner.instagram_url), label: s.instagram, Icon: InstagramIcon },
    { href: whatsappUrl(partner.whatsapp), label: s.whatsapp, Icon: WhatsAppIcon },
    { href: websiteUrl(partner.website_url), label: s.website, Icon: GlobeIcon },
  ].filter((x): x is { href: string; label: string; Icon: () => React.JSX.Element } => !!x.href)

  return (
    <SubPage c={c} altHref={links.alternate}>
      <link rel="stylesheet" href="/site/share.css" precedence="share" />
      <RefCookie value={referrer} />
      <section className="section apx-sub__section apx-share__section" aria-labelledby="partner-h">
        <div className="wrap">
          <article className="apx-share">
            <div className="apx-share__cover">
              {partner.cover_url ? <img src={partner.cover_url} alt="" width={1200} height={675} fetchPriority="high" /> : null}
            </div>

            <header className="apx-share__head">
              {partner.logo_url ? (
                <img className="apx-share__logo" src={partner.logo_url} alt="" width={88} height={88} />
              ) : (
                <div className="apx-share__logo apx-share__logo--mark" aria-hidden="true">
                  <img src="/img/apex-peak.svg" alt="" width={40} height={35} />
                </div>
              )}
              <p className="apx-share__kind">
                <span>{kind}</span> · <span>{partner.city}</span>
              </p>
              <h1 id="partner-h">
                <bdi>{partner.name}</bdi>
                {partner.verified ? (
                  <span className="apx-share__verified">
                    <CheckIcon />
                    {s.verified}
                  </span>
                ) : null}
              </h1>
            </header>

            <div className="apx-share__perks">
              {partner.community_perk ? (
                <div className="apx-share__perk apx-share__perk--hero">
                  <p className="t-label">{s.riderPerkLabel}</p>
                  <p className="apx-share__perk-text">{s.riderPerk(partner.community_perk)}</p>
                </div>
              ) : null}
              {partner.member_perk ? (
                <div className="apx-share__perk apx-share__perk--member">
                  <p className="t-label">
                    <LockIcon />
                    {s.memberPerkLabel}
                  </p>
                  <p className="apx-share__perk-text">{partner.member_perk}</p>
                  <p className="muted">{s.memberPerkNote}</p>
                </div>
              ) : null}
              {!partner.community_perk && !partner.member_perk ? (
                <div className="apx-share__perk apx-share__perk--empty">
                  <p>{s.noPerk}</p>
                </div>
              ) : null}
            </div>

            <ShareCta links={links} label={s.cta.dealer} c={s} platform={platform} />

            {channels.length ? (
              <ul className="apx-share__links">
                {channels.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Icon />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            {partner.description ? (
              <section className="apx-share__about" aria-labelledby="partner-about">
                <h2 id="partner-about">{s.about}</h2>
                <p>{partner.description}</p>
              </section>
            ) : null}
          </article>
        </div>
      </section>
    </SubPage>
  )
}
