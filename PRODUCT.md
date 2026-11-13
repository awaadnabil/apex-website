# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** riders and drivers in the GCC, 22–45, on premium bikes and cars. They read Arabic and English and land here from a share link, a social post or a search. The site's job for them is to get the app installed: iPhone via the App Store, Android via the APK on /download.
- **Secondary (partners):** motor dealers and shops that sell bikes, cars, parts and gear, plus Ride Stop venues (cafés, restaurants, gaming cafés). They come to understand the partner terms and send an enquiry.

## Product Purpose

APEX is the GCC's motor community app. Riders and drivers find and join group rides, track rides live (FLY), earn XP that feeds a Weekly Spotlight (top 3), buy and sell in the Market, and use the APEX Card for member perks at partner dealers and Ride Stops.

The website succeeds when a visitor installs the app (the one main action) or a partner sends an enquiry (the secondary action).

## Positioning

The app combines the ride itself (group rides, FLY live tracking, XP, Weekly Spotlight), the trade (the Market, with listings from riders and verified dealers) and the places riders stop (APEX Card perks at dealers and Ride Stops). It is built for the GCC and Dubai-based. A generic fitness tracker or classifieds site can't honestly claim that combination.

## Operating Context

- iOS app is live: App Store id 6773114294, `https://apps.apple.com/app/apex-mena/id6773114294`.
- Android is an APK, not on Play Store, installed from `/download` (`NEXT_PUBLIC_APK_URL`, defaulting to the GitHub release `awaadnabil/apex-releases`).
- Deep-link share routes open the app or fall back to the store: `/c/[code]` club invite, `/drive/[id]` ride, `/join/[ref]` referral, `/l/[id]` Market listing. Universal links come from `public/.well-known/`.
- Public share pages, English and Arabic, for someone without the app: `/dealer/[id]` and `/ar/dealer/[id]` (a partner: cover, logo, name, city, the perk every rider gets as the hero, the members' extra, Directions / Instagram / WhatsApp, one install CTA), `/club/[id]` and `/ar/club/[id]` (cover, name, size, next rides, one join CTA). Each has its own 1200×630 card (`opengraph-image.tsx`). `?ref=<userId>` rides along on the store, download and `apex://` links and is kept in the `apex_ref` cookie for a month. Data comes only from two anon RPCs that return public fields (`supabase/sql/2026-11-13_public_share_rpcs.sql`), so no fee rate can reach the page.
- Membership is bought in-app (Apple IAP).

## Capabilities and Constraints

- Group rides with a meetup point, roll time and destination. FLY live ride tracking. XP and the Ride Card. Weekly Spotlight (top 3). Market for bikes, cars, parts and gear from riders and verified dealers. APEX Card QR perks. Clubs/tribes and chat.
- **APEX Member:** AED 49/month or AED 399/year (owner, 2026-11-09). These are the only membership figures; never 49.99.
- **Partners (dealers, shops, Ride Stops):** no listing fee and no monthly fee; they pay only on sales to APEX members, tracked by QR. Rates are subject to revision, so **no percentage is ever printed on the site**. The public line is "You only pay on member sales."
- Dubai-based, GCC-wide.
- Languages: English and Arabic with full RTL.
- Stack: Next.js 16 App Router, Tailwind v4, Vercel, Vercel Analytics, Supabase (project `lsstkxtzttvdwetwehwm`).
- Supabase schema changes are written as SQL and **run by the owner in the SQL Editor**, never applied by tooling.
- Public forms (partner enquiry, concierge) must save to Supabase, notify the owner instantly by **Expo push to the owner's user UUID** (the `admin-direct-push` payload shape; no email for now), and be spam-protected (Cloudflare Turnstile plus a honeypot).
- `/privacy` content must not change. `/download` and every existing route must keep working.

## Brand Commitments

- Name: APEX. Logo: the chrome peak mark with "APEX" wordmark (`~/Downloads/apex-logo-mark.svg`, vector steel gradient).
- Colour commitment: black/chrome with teal `#00C8C8` accent (owner-binding).
- App voice, taken from the App Store images: short, two-beat lines. "Find your next ride. Roll in tonight." "Every ride. Tracked live, to the metre." "Earn XP. Share the flex." "Members save at the counter." "Every view, lead and visit. Counted."
- Arabic font: IBM Plex Sans Arabic or Noto Kufi Arabic.

## Evidence on Hand

- App Store marketing images, 1206×2622: `~/Downloads/APEX-63in-1.png` … `-6.png` (Ride Together, FLY Live, Ride Card/XP, Market, APEX Card, For Dealers).
- Only describe features visible in the App Store images (`APEX-63in-1…6`). Anything beyond them is marked `data-assumed`. The `APEX SC` screenshots are an outdated UI; don't use them.
- Stand-in photos (not APEX's own, replace with real shoots): `apex-supercars.jpg`, `apex-offroad-real.jpg` and the 6 Vercel-blob tribe photos.
- **Absent, never fabricate:** member counts, ride counts, downloads, ratings, reviews, testimonials, awards, press, partner names or logos. The existing home stats ("350+ routes", "7 cities") are unverified and must not be carried forward.

## Product Principles

1. Install first. Every screen moves a rider toward the App Store or the APK, and both languages make that equally easy.
2. Show the real app. Screenshots and real terms persuade. Invented numbers don't.
3. Arabic is native, not translated: equal craft, a mirrored layout and its own typography.
4. Partners get plain terms: no listing fee, no monthly fee, pay only on member sales. No hype and no printed rates.
5. Every enquiry reaches a human the same day.

## Accessibility & Inclusion

WCAG 2.2 AA. Pinch-zoom must stay enabled (the current layout disables `userScalable`). Honour reduced motion. Tap targets are 44px or larger. Full RTL with correct `lang`/`dir`.
