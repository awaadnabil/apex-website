// /club/[id] and /ar/club/[id]: a club as someone without the app sees it: cover, name, size, the next
// rides, and one action, joining on APEX.
import { COPY, type Locale } from '@/lib/site/content'
import { formatRideWhen, SHARE_COPY } from '@/lib/share/copy'
import { shareLinks } from '@/lib/share/links'
import type { PublicClub } from '@/lib/share/supabase'
import type { Platform } from '@/lib/share/platform'
import { SubPage } from '@/components/site/sub-page'
import { ShareCta } from './cta'
import { RefCookie } from './ref-cookie'
import { CheckIcon, UsersIcon } from './icons'

function dayParts(iso: string, locale: Locale): { day: string; month: string } {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return { day: '', month: '' }
  const tag = locale === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB'
  return {
    day: d.toLocaleDateString(tag, { day: 'numeric', timeZone: 'Asia/Dubai' }),
    month: d.toLocaleDateString(tag, { month: 'short', timeZone: 'Asia/Dubai' }),
  }
}

export function ClubSharePage({ club, locale, referrer, platform }: { club: PublicClub; locale: Locale; referrer: string | null; platform: Platform }) {
  const c = COPY[locale]
  const s = SHARE_COPY[locale]
  const links = shareLinks('club', club.id, locale, referrer)
  const tribe = club.tribe ? s.tribe[club.tribe] ?? club.tribe : null

  return (
    <SubPage c={c} altHref={links.alternate}>
      <link rel="stylesheet" href="/site/share.css" precedence="share" />
      <RefCookie value={referrer} />
      <section className="section apx-sub__section apx-share__section" aria-labelledby="club-h">
        <div className="wrap">
          <article className="apx-share">
            <div className="apx-share__cover apx-share__cover--tall">
              {club.cover_image_url ? <img src={club.cover_image_url} alt="" width={1200} height={900} fetchPriority="high" /> : null}
            </div>

            <header className="apx-share__head">
              <div className="apx-share__logo apx-share__logo--mark" aria-hidden="true">
                <img src="/img/apex-peak.svg" alt="" width={40} height={35} />
              </div>
              <p className="apx-share__kind">
                <span>{s.kind.club}</span>
                {tribe ? <> · <span>{tribe}</span></> : null}
              </p>
              <h1 id="club-h">
                <bdi>{club.name}</bdi>
                {club.is_verified ? (
                  <span className="apx-share__verified">
                    <CheckIcon />
                    {s.verified}
                  </span>
                ) : null}
              </h1>
              {club.member_count > 0 ? (
                <p className="apx-share__sub">
                  <b>{s.members(club.member_count)}</b>
                </p>
              ) : null}
            </header>

            {club.description ? (
              <section className="apx-share__about" aria-label={s.about}>
                <p>{club.description}</p>
              </section>
            ) : null}

            <ShareCta links={links} label={s.cta.club} c={s} platform={platform} />

            <section className="apx-share__rides" aria-labelledby="club-rides">
              <h2 id="club-rides">{s.ridesH}</h2>
              {club.upcoming_rides.length ? (
                club.upcoming_rides.map((r) => {
                  const { day, month } = dayParts(r.date_time, locale)
                  const where = [r.meeting_point, r.destination_name].filter(Boolean).join(' → ')
                  const km = r.route_distance_km && r.route_distance_km > 0 ? s.km(Math.round(r.route_distance_km)) : null
                  const line = [formatRideWhen(r.date_time, locale), km, r.count != null ? s.riding(r.count) : null].filter(Boolean).join(' · ')
                  return (
                    <div className="apx-share__ride" key={r.id}>
                      <div className="apx-share__ride-date" aria-hidden="true">
                        <b>{day}</b>
                        <span>{month}</span>
                      </div>
                      <div>
                        <h3><bdi>{r.title}</bdi></h3>
                        <p>{line}</p>
                        {where ? <p>{where}</p> : null}
                        {r.club_members_only ? (
                          <span className="pill"><UsersIcon />{s.membersOnly}</span>
                        ) : null}
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="apx-share__empty">{s.noRides}</p>
              )}
            </section>
          </article>
        </div>
      </section>
    </SubPage>
  )
}
