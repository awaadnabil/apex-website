# APEX rebuild: final report (2026-11-09)

**GATE: PASS** (design-taste-frontend, final run on the production build; 4 waivers, 31 non-blocking WARNs)

## impeccable critique, before → after
| | Before (Stage 3) | After (Stage 6) |
|---|---|---|
| Nielsen total | 19/32 (59%, Acceptable) | 25/36 (69%, top of Acceptable, edge of Good) |
| Detector (live, `/`) | 10 findings | 2 (both deliberate) |
| Audit | 14/20 | P1 regression from the glass nav found and fixed after the re-score |

## Routes
| Before | After |
|---|---|
| `/` | 200, rebuilt |
| — | `/ar` 200, `/ar/download` 200 (new) |
| `/download`, `/privacy`, `/terms` | 200; text identical, source byte-identical |
| `/concierge` | 200; form really delivers |
| `/c/[code]`, `/drive/[id]` (+OG), `/join/[ref]`, `/l/[id]`, `/.well-known/*` | 200, unchanged |
| — | `/partner` → 308 `/#partner`; `/dev/break-ui` 404 in production |
| unknown | 404 |

## Proof
- **Lighthouse mobile, devtools throttling:** LCP 2.0–2.1 s, CLS 0, Performance 97, Accessibility / Best practices / SEO 100 (`/` and `/ar`).
- **Lighthouse simulated model:** LCP 3.7–4.3 s. Not met under the simulation; reported as is.
- **Images:** largest 176 KB.
- **Links:** every link and anchor followed; all 200 after creating the missing `/og.jpg`.
- **Forms:** partner (EN and AR) and concierge tested end to end with Turnstile test keys and a function stand-in. Arabic-Indic digits are folded. The honeypot, minimum fill time, no-token and no-JS paths were all verified.

## Assumed facts (`data-assumed`)
- Ride Stops' first month as Featured is free (from the original brief; rates are subject to revision).
- Brand terms left in Latin inside Arabic (FLY, XP, Ride Card, Weekly Spotlight, Ride Stops, Featured, APEX Card, APEX Member).
- Spotlight XP values in the mock (200 / 165 / 140) are illustrative UI, not data.

## Stand-ins to replace with real APEX photos
- `standin-riders-mountain` (Market): Vercel blob apex-bikes
- `standin-night-meet` (APEX Card): Vercel blob apex-community
- `standin-convoy` (partner form): Vercel blob apex-supercars
- Not used but still stand-ins: `apex-supercars.jpg`, `apex-offroad-real.jpg`, apex-karting, apex-offroad (blob)

Owner assets still needed:
- The official **Arabic** App Store badge (the English one is shown on `/ar`).
- The App Store Home image still shows "AED 49.99/month".
- Screens recaptured from a seeded demo account (the current ones show test data).

## Waivers
1. `copy-headings`: "You only pay on member sales." is the owner's exact wording.
2. `section-gaps` at 390, hero → rides: the kit's own collage-hero geometry.
3. & 4. `scroll-linked`: phones settling on scroll, by owner direction ("i love transitions on scroll").

## Open issues (with reasons)
- **P1 mobile pacing:** the after-critique flags 150–300px dark bands on phones. The cause is design-taste-frontend's one-section-per-screen rule (sections of exactly 1 or 2 screens). Removing it fails the build gate, so this is a real conflict between the two skills; it needs your call.
- **P2 Arabic code-switching:** brand terms are in Latin. They need the app's official Arabic names (owner).
- **P2 dealer dashboard card:** shows labels without values. Better: the real "For Dealers" screen recaptured with non-zero data.
- **P2 download pair:** the official badge beside a pill. An Android badge-style button would match.
- Simulated-model LCP 3.7–4.3 s (applied throttling 2.0–2.1 s).
