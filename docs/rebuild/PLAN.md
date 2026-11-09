# APEX site rebuild: Stage 1 plan, v2 (awaiting OK)

> **v2, 2026-11-09. Owner's answers override v1 below where they differ.** Reviewable page: https://claude.ai/artifact/9gmnyfFncvZzqQ2okrG6wS
> - Only the App Store images (APEX-63in-1..6) are used; the APEX SC screenshots are outdated. Copy describes only what those images show; anything else is `data-assumed`.
> - Membership is **AED 49/month and AED 399/year**; 49.99 is never shown. (The App Store Home image still shows 49.99, so the hero crops above it.)
> - **No percentages** anywhere. Partner line: "You only pay on member sales." plus "No listing fee. No monthly fee."
> - Moments: `line-carries-colour` (#card) stays. `counter-rolls` is out (it rolled percentages). Re-dealt as `letters-assemble` on the statement "You only pay on member sales." (pointer-ripple deals were skipped as decoration).
> - Notify: Expo push to the owner's UUID (env `ENQUIRY_NOTIFY_USER_ID`); no email. The method (A/B/C) is pending the owner's choice.
> - Partner form: optional Phone/WhatsApp added.
> - Stand-ins: apex-supercars.jpg, apex-offroad-real.jpg and the 6 blob tribe photos, each to be replaced with real APEX photos.

---

## v1 (original)

**Line 1, kind:** software. Page type `software`, site-kind `software`.

**Line 2, the deal (dealt by design-taste-frontend, not picked):**
- **Hero:** `collage`. Text on 5 columns; on the right 6 columns, a lit frame holding the real APEX Home screen in a phone, cut by the frame's bottom edge; one small live card on its lower left that loops (a ride is saved, then +150 XP lands).
- **Palette:** the client's own colours via `start.mjs brand` (the dealt `cool-grey-cobalt` is replaced). Ground `#080808`, surface `#121518`, ink `#EEF2F4` (chrome white), muted `#9AA4AB` (brushed steel), accent/action teal `#00C8C8` with `#080808` on it. The inverse band is chrome `#EEF2F4` with ink `#080808`. Why it fits: APEX is a night-ride and machine brand. The black is the road at night, the steel greys come straight from the chrome peak logo's gradient, and the teal is the app's own accent, so the site and the app read as one product the moment someone installs.
- **Type:** dealt `outfit`, which is Outfit (display 400, tracking −3%/−4% at hero) plus DM Mono for UI figures (XP, AED, %). Outfit's geometric, wide caps sit next to the APEX wordmark's spaced geometric letters.
  - **Arabic:** IBM Plex Sans Arabic 400/500, loaded on `/ar` only. It has the same geometric, open counters as Outfit, and its Latin cut matches when brand terms (FLY, XP, APEX Card) sit inside Arabic lines.
- **Radius:** `round` (consumer app).
- **Nav:** `nav-centre`. **Footer:** `footer-statement` (lit ground). **Close:** `close-word` (h2, the badge pair, then APEX set across the wrap; the client's logo stands in for the dealt `arc` mark). **Rhythm:** `dark-band`, which on a dark page means one `.ground-inverse` chrome band; it holds Partners. **Buttons:** `pill`.
- **Ground:** `topglow` in teal behind the hero frame. **Effect (tech, one):** `grain-gradient` inside the hero art frame only, **held still** (no animation; the motion budget goes to FLY and XP per Stage 4).
- **Moments (2, dealt):** see the moments table below.
- **Scene:** none.

## Moments

| Moment | Section | Why it moves |
|---|---|---|
| `line-carries-colour` | #card | A 1px teal line climbs through the APEX Card panel like a QR scan line, revealing the surface ground. |
| `counter-rolls` | #partners | The four real terms (5%, 1.5%, 6 months, 1 month free) roll once like an odometer. They rest on the true figures before and after, and never read as zeros. |

## Voice card

```
Voice: the product as the hero (copy-registers 11), in the client's own App Store cadence ("Every ride. Tracked live, to the metre.")
Pairs: sure, not loud; precise, not technical; insider, not exclusive-club
Person: "you" for the rider; APEX/FLY/Market as the subject of feature lines; "we" only in the form reply
Sentences: 8–16 words; one longer one where a mechanism needs it
Humour: none
House words: ride, roll time, meetup, FLY, XP, Ride Card, Weekly Spotlight, Market, APEX Card, Ride Stop, APEX Member — the same word every time, Latin brand terms kept inside Arabic
Never: counts of members or rides, "exclusive", "elite", "by invitation", speed/road-safety boasts, virtue words
```

## Routes and i18n architecture

- `/` English (`<html lang="en" dir="ltr">`), `/ar` Arabic (`<html lang="ar" dir="rtl">`). Each uses its own root layout via route groups, so `lang`/`dir` are server-rendered, not swapped by JS.
- Existing routes move into the `(en)` group **without URL changes**.
- New, additive routes: `/ar/download` (Arabic version of /download, the same APK URL and App Store link), plus a `/partner` → `/#partner` redirect.
- `hreflang` alternates are on both home pages. A language link (English / العربية) sits in the nav and footer.
- Layout uses logical properties only (`margin-inline-start`, `inset-inline-end`, `text-align: start`), so the mirroring happens through `dir`. Exceptions: phone screenshots and the FLY map don't mirror, and arrow glyphs flip via `:dir(rtl)`.
- The kit (system.css, layout, motion, the needed moments) is copied into `public/assets/` and loaded only on `/` and `/ar`. /privacy, /terms, /download, /concierge and the share routes keep their current styles.

## Sections as screens (1440×900; 390 noted when it differs)

| # | id | One idea | Picture (kind) | Screens |
|---|---|---|---|---|
| 1 | hero | APEX is the motor community app for GCC riders and drivers; install it | Real Home screen in a phone on the lit frame + live "Ride saved / +150 XP" card (**object**) | 1 |
| 2 | rides | Group rides carry a meetup, roll time and destination, and FLY tracks the group live | Two real screens side by side: the ride card on Home, and FLY Live on the map (**object** 2/3) | 1 |
| 3 | xp | Every ride earns XP on your Ride Card; the top 3 make the Weekly Spotlight | Bento: real Ride Card screen, a live Spotlight podium fragment (positions 1–3, no invented names; avatars as initials-free silhouettes) and the share row Instagram / WhatsApp / Save / Post with real icons (**UI fragments**) | 1 |
| 4 | market | The Market sells bikes, cars, parts and gear from riders and verified dealers | Stand-in photograph of bikes lined up in a showroom + real Market screen beside it (**use/world**) | 1 |
| 5 | card | The APEX Card gets members perks at dealers and Ride Stops; APEX Member is AED 49.99/month | Stand-in photograph of bikes parked outside a café at night + live APEX Card QR panel (code ticks over); **moment: line-carries-colour** (**world + UI**) | 1 |
| 6 | partners | Dealers, shops and Ride Stops: the terms, in four numbers | Inverse chrome band. Two columns (Dealers & shops / Ride Stops) + the real "For Dealers" dashboard screen; **moment: counter-rolls** on the terms (**UI**) | 1 (2 at 390) |
| 7 | partner | Send a partner enquiry | The form (Turnstile + honeypot) beside a stand-in photograph of a dealer counter (**world**) | 1 (2 at 390) |
| 8 | faq | Five plain answers: Android install, price, region, dealer fee, Ride Stops | none (FAQ is the one picture-less section) | 1 |
| 9 | footer.closing | Download APEX, then links and legal | `close-word`: the badge pair, APEX set wide; links, language, © | 1 |

Object count: hero + rides + market (the app shown whole as a screen) = 3. The rest is carried by fragments, photographs, the band and the form.

## Copy draft — English

**Head**
- title: `APEX: the motor community app for GCC riders and drivers`
- description: `Group rides, FLY live tracking, XP and the Weekly Spotlight, the Market and APEX Card perks. On iPhone and Android.`

**Nav** (centre): Rides · XP · Market · APEX Card · Partners — then `العربية` — the button **Download APEX** (→ /download)

**1 Hero**
- h1: **Motor community app for GCC riders and drivers**
- lead: Join group rides with a meetup point and a roll time, track them live with FLY, and earn XP toward the Weekly Spotlight. Built in Dubai.
- actions: [Download on the App Store badge] · **Download for Android**
- one muted line: iPhone on the App Store. Android as a direct download.
- live card: `Ride saved` → `+150 XP earned` → `Ride Card updated`

**2 Rides**
- h2: Group rides with a meetup, roll time and destination. <muted>FLY tracks every rider live, to the metre.</muted>
- body: Post a ride or request a seat on one. Everyone sees where to meet and when you roll. Once you're moving, FLY puts the whole group on one live map.

**3 XP**
- h2: XP for every ride you save. <muted>The top 3 make the Weekly Spotlight.</muted>
- card 1 — **Puts every ride on your Ride Card**: distance, time, top speed and the XP it earned.
- card 2 — **Ranks the week's top 3**: the Weekly Spotlight resets every week.  *(data-assumed: weekly reset is implied by the name; confirm)*
- card 3 — **Shares the card in one tap**: Instagram story, WhatsApp, or straight to your profile.

**4 Market**
- h2: Market for bikes, cars, parts and gear. <muted>Listed by riders and verified dealers.</muted>
- body: Search by category, save what you like, and contact the seller from the listing. Verified dealers carry a badge, so you know who you're buying from.  *(data-assumed: "badge" — confirm wording)*
- link: **See the Market in the app** → /download

**5 APEX Card**
- h2: APEX Card perks at dealers and Ride Stops
- body: Show your QR at the counter and the member price applies. Ride Stops are the cafés, restaurants and gaming cafés on your route.
- price row: APEX Member · AED 49.99 a month · bought in the app

**6 Partners** (chrome band)
- h2: APEX for dealers, shops and Ride Stops. <muted>Plain terms, paid only on member sales.</muted>  *(the second sentence is accurate only if no listing/subscription fee exists — confirm, else cut)*
- Dealers & shops — **5%** on sales to APEX members. Members scan your QR at the counter, so each sale is tracked. Your dashboard counts every view, lead and visit.
- Ride Stops — **1.5%** for your first **6 months**, then 5%. Your first **1 month** as Featured is free.
- button: **Send a partner enquiry** (→ #partner)

**7 Partner enquiry**
- h2: Partner enquiry. <muted>It goes straight to the APEX partner team.</muted>
- fields: Business name · Your name · Partner type (Dealer / Shop / Ride Stop) · City · Email · Phone or WhatsApp (optional)
- button: **Send partner enquiry**
- sent: "Your partner enquiry is in. The APEX team will email you." · failure: "That didn't send. Your details are still here — try again, or email partners@getapexmena.com."  *(address to confirm)*
- errors: "Write your business name." · "Write an email address with an @." · "Choose dealer, shop or Ride Stop."

**8 Questions**
1. *How do I install APEX on Android?* APEX for Android is a direct download, not on Google Play. Get the file from the download page, allow the install once, then sign in.
2. *What does APEX Member cost?* AED 49.99 a month, bought inside the app.
3. *Where does APEX run?* APEX is built in Dubai and runs across the GCC.
4. *How do dealers pay the 5%?* Members scan your QR at the counter. The 5% applies to those member sales only.
5. *What is a Ride Stop?* A café, restaurant or gaming café on riders' routes that offers APEX Card perks. New Ride Stops get their first month as Featured free.

**9 Close + footer**
- h2: Download APEX for iPhone or Android
- [App Store badge] · **Download for Android** — then APEX set wide
- links: Download · Concierge · Privacy · Terms · العربية — © 2026 APEX · Dubai

## Copy draft — العربية (RTL; brand terms kept in Latin)

**Head** — title: `APEX: تطبيق مجتمع السيارات والدراجات في الخليج` · description: `رحلات جماعية، وتتبّع مباشر مع FLY، ونقاط XP وWeekly Spotlight، والسوق، ومزايا APEX Card. على iPhone وAndroid.`

**Nav:** الرحلات · XP · السوق · APEX Card · الشركاء — `English` — **نزّل APEX**

**1** h1: **تطبيق مجتمع السيارات والدراجات في الخليج**
lead: انضم إلى رحلات جماعية بنقطة تجمّع وموعد انطلاق، وتابعها مباشرةً مع FLY، واجمع نقاط XP للوصول إلى Weekly Spotlight. صُنع في دبي.
actions: [شارة App Store العربية الرسمية] · **نزّل لأجهزة Android**
muted: ‏iPhone عبر App Store، وAndroid بتنزيل مباشر.
card: `حُفظت الرحلة` ← `+150 XP` ← `تحدّثت Ride Card`

**2** h2: رحلات جماعية بنقطة تجمّع وموعد انطلاق ووجهة. <muted>يتتبّع FLY كل راكب مباشرةً، بدقة المتر.</muted>
body: انشر رحلة أو اطلب الانضمام إلى واحدة. يرى الجميع مكان التجمّع وموعد الانطلاق، وحين تتحرّكون يضع FLY المجموعة كلها على خريطة مباشرة واحدة.

**3** h2: نقاط XP مع كل رحلة تحفظها. <muted>أفضل 3 يدخلون Weekly Spotlight.</muted>
- **تُسجَّل كل رحلة على Ride Card**: المسافة والوقت والسرعة القصوى ونقاط XP التي حصدتها.
- **يرتّب أفضل 3 في الأسبوع**: تبدأ Weekly Spotlight من جديد كل أسبوع.
- **تشارك البطاقة بلمسة**: قصة Instagram أو WhatsApp أو مباشرةً في ملفك.

**4** h2: سوق للدراجات والسيارات وقطع الغيار والمعدات. <muted>يعرضها الأعضاء ووكلاء موثّقون.</muted>
body: ابحث حسب الفئة، واحفظ ما يعجبك، وتواصل مع البائع من الإعلان نفسه. يحمل الوكلاء الموثّقون شارة، فتعرف ممن تشتري.
link: **شاهد السوق في التطبيق**

**5** h2: مزايا APEX Card لدى الوكلاء ومحطات Ride Stops
body: اعرض رمز QR عند الكاشير ويُطبَّق سعر العضو. ‏Ride Stops هي المقاهي والمطاعم ومقاهي الألعاب على طريقك.
price: ‏APEX Member · ‏49.99 درهماً شهرياً · الاشتراك من داخل التطبيق

**6** h2: APEX للوكلاء والمتاجر ومحطات Ride Stops. <muted>شروط واضحة، والعمولة على مبيعات الأعضاء فقط.</muted>
- الوكلاء والمتاجر — **5%** على المبيعات لأعضاء APEX. يمسح العضو رمز QR عند الكاشير فتُسجَّل كل عملية بيع، وتعرض لوحتك كل مشاهدة وعميل محتمل وزيارة.
- ‏Ride Stops — **1.5%** خلال أول **6 أشهر**، ثم 5%. وشهرك الأول **1** ضمن Featured مجاني.
- button: **أرسل طلب شراكة**

**7** h2: طلب شراكة. <muted>يصل مباشرةً إلى فريق الشراكات في APEX.</muted>
fields: اسم النشاط التجاري · اسمك · نوع الشراكة (وكيل / متجر / Ride Stop) · المدينة · البريد الإلكتروني · الهاتف أو WhatsApp (اختياري)
button: **أرسل طلب الشراكة** · sent: «وصل طلب الشراكة، وسيراسلك فريق APEX عبر البريد الإلكتروني.» · failure: «لم يُرسَل الطلب. بياناتك ما زالت هنا، حاول مجدداً.»
errors: «اكتب اسم نشاطك التجاري.» · «اكتب بريداً إلكترونياً يحتوي على @.» · «اختر وكيلاً أو متجراً أو Ride Stop.»

**8** أسئلة
1. *كيف أثبّت APEX على Android؟* تطبيق APEX لأجهزة Android متاح بتنزيل مباشر وليس على Google Play. نزّل الملف من صفحة التنزيل، واسمح بالتثبيت مرة واحدة، ثم سجّل الدخول.
2. *كم تكلفة APEX Member؟* ‏49.99 درهماً شهرياً، والاشتراك من داخل التطبيق.
3. *أين يعمل APEX؟* صُنع APEX في دبي ويعمل في جميع دول الخليج.
4. *كيف يدفع الوكلاء نسبة 5%؟* يمسح الأعضاء رمز QR عند الكاشير، وتُطبَّق نسبة 5% على مبيعات الأعضاء هذه فقط.
5. *ما هي Ride Stop؟* مقهى أو مطعم أو مقهى ألعاب على طرق الأعضاء يقدّم مزايا APEX Card. وتحصل كل Ride Stop جديدة على شهرها الأول ضمن Featured مجاناً.

**9** h2: نزّل APEX على iPhone أو Android — links: التنزيل · الدعم · الخصوصية · الشروط · English — © 2026 APEX · دبي

## Photo list

| Slot | Source | Status |
|---|---|---|
| Logo (nav, footer, favicon, OG) | `~/Downloads/apex-logo-mark.svg` | **real** |
| Hero phone: Home screen | `~/Downloads/APEX-63in-1.png` (phone crop only; the baked marketing text is cut off) | **real** |
| Rides: FLY Live map | `APEX-63in-2.png` phone crop | **real** |
| XP: Ride Card | `APEX-63in-3.png` phone crop | **real** |
| Market screen | `APEX-63in-4.png` phone crop | **real** |
| APEX Card QR (reference for the live panel) | `APEX-63in-5.png` | **real** (rebuilt as live HTML) |
| Partners: dealer dashboard | `APEX-63in-6.png` phone crop | **real** |
| Market photograph: bikes in a showroom | `photos.mjs search` (licensed, no readable brand badges) | **stand-in** |
| APEX Card photograph: bikes outside a café at night | `photos.mjs search` | **stand-in** |
| Partner form photograph: a dealer or workshop counter | `photos.mjs search` | **stand-in** |
| App Store badges EN + AR | Apple marketing tools, official artwork | **real** (official) |
| Share image `og.jpg` | hero still from `shoot.mjs` | generated from real screens |

Not used: the six Vercel-blob tribe photos and `~/Downloads/apex-supercars.jpg` / `apex-offroad-real.jpg`, because their origin is unknown (they may be generated). If they're APEX's own shots, they replace the stand-ins.

## Forms and backend (all three forms: partner, concierge)

- A server action validates, then checks the honeypot plus minimum fill time (≥3 s), then verifies Cloudflare Turnstile server-side, then inserts into Supabase, then sends the email via Resend.
- SQL file `supabase/2026-11-09_enquiries.sql`, **run by you in the SQL Editor**. It creates `partner_enquiries` and `concierge_requests` with RLS on, no public read, and insert via service role only.
- Env needed in Vercel: `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `ENQUIRY_NOTIFY_TO`, `ENQUIRY_FROM` (a verified getapexmena.com sender), `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`.
- No silent success: if the insert or the email fails, the user sees the failure and their typing is kept. In the preview without keys, the form says it can't send and never fakes a ticket.
- /concierge: same page and copy. The fake `APX-123456` ticket and the "within the hour" promise are removed, and the form now really sends.

## Other fixes riding along

- Remove `userScalable: false` (it blocks pinch-zoom, a WCAG failure).
- Drop the invented "350+ routes / 7 cities" stats from the home page.
- Delete nothing under `/privacy`; its content is byte-identical before and after (diff-checked in Stage 6).

## Routes before → after

| Before | After |
|---|---|
| `/` | `/` rebuilt (en) |
| — | `/ar` (new) |
| `/download` | `/download` unchanged content |
| — | `/ar/download` (new, Arabic) |
| `/privacy` | unchanged |
| `/terms` | unchanged |
| `/concierge` | same content, form now really delivers |
| `/c/[code]`, `/drive/[id]` (+ OG image), `/join/[ref]`, `/l/[id]` | unchanged |
| `/.well-known/*` | unchanged |
| — | `/partner` → 308 to `/#partner` |
| `app/_android`, `app/_membership` | private folders, not routes; untouched |
