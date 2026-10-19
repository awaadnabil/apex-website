/**
 * Single source of truth for everything search engines and social cards read.
 * Change the domain or store URLs here, never inline.
 */
export const SITE = {
  url: 'https://getapexmena.com',
  name: 'APEX',
  legalName: 'APEX MENA',
  tagline: 'By invitation. By passion. By machine.',
  title: 'APEX — Car & Motorcycle Community App for Dubai, the UAE and the GCC',
  description:
    'APEX is the invite-only motor community for the GCC. Supercar drives, superbike rides, karting and offroad meets across the UAE and Oman — RSVP, live ride tracking and SOS in one app for iPhone and Android.',
  appStoreId: '6773114294',
  appStoreUrl: 'https://apps.apple.com/app/apex-mena/id6773114294',
  apkUrl: 'https://github.com/awaadnabil/apex-releases/releases/latest/download/apex.apk',
  heroImage:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-supercars-h7OydBomTgS4J9Cz59dYOKCUL8My8z.jpg',
  instagram: '', // add the APEX Instagram URL here — it feeds Organization.sameAs
  /**
   * IndexNow key (public by design — it's served at /<key>.txt). Ping Bing,
   * Yandex, Seznam, Naver after a deploy:
   *   https://api.indexnow.org/indexnow?url=<page>&key=<key>
   */
  indexNowKey: '89eab492a093f6f82f8848cc8242b458',
  sameAs: ['https://apps.apple.com/app/apex-mena/id6773114294'],
  areaServed: ['United Arab Emirates', 'Oman', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Kuwait'],
} as const

export type Tribe = {
  slug: string
  name: string
  /** Search-facing H1 — says what it is and where. */
  heading: string
  metaTitle: string
  metaDescription: string
  card: string
  img: string
  alt: string
  intro: string
  points: { title: string; body: string }[]
  places: string[]
}

export const TRIBES: Tribe[] = [
  {
    slug: 'supercar',
    name: 'Supercar',
    heading: 'Supercar & exotic car community in Dubai and the GCC',
    metaTitle: 'Supercar Drives & Exotic Car Club in Dubai and the UAE',
    metaDescription:
      'Join supercar and exotic car drives in Dubai, Abu Dhabi and across the GCC. APEX organises convoys, mountain runs and night meets for serious owners — by invitation.',
    card: 'Hypercars and exotics on the world’s fastest open roads.',
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-supercars-h7OydBomTgS4J9Cz59dYOKCUL8My8z.jpg',
    alt: 'A Bugatti Chiron leading supercars down Sheikh Zayed Road at sunset',
    intro:
      'The Supercar tribe is where owners of exotics, hypercars and serious performance cars in the UAE find each other and actually drive. Not a static car show — convoys out of the city, early mountain runs and late-night meets, organised and run inside the APEX app.',
    points: [
      {
        title: 'Organised drives, not parking-lot meets',
        body: 'Every drive has a lead, a route, a meeting point and a headcount. RSVP in one tap and the convoy is tracked live on the road so nobody gets lost behind a red light.',
      },
      {
        title: 'Routes worth the fuel',
        body: 'Mountain roads, coastal runs and cross-border trips across the UAE and Oman — the drives the GCC is built for, planned by people who have done them.',
      },
      {
        title: 'Owners only, by invitation',
        body: 'Access is reviewed by the APEX concierge so every convoy is people who drive at the same standard and respect the road.',
      },
    ],
    places: ['Jebel Jais', 'Jebel Hafeet', 'Hatta', 'Sheikh Zayed Road', 'Al Qudra', 'Muscat'],
  },
  {
    slug: 'moto',
    name: 'Moto',
    heading: 'Superbike & motorcycle riding community in Dubai and the UAE',
    metaTitle: 'Motorcycle Group Rides & Superbike Community in Dubai, UAE',
    metaDescription:
      'Find superbike group rides in Dubai and the UAE. Friday night rides, Jebel Jais and Jebel Hafeet mountain runs, live group tracking and one-press SOS — all in the APEX app.',
    card: 'Superbikes carving the mountain passes at first light.',
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-bikes-s4mRdYk7929ut9Y6Jbo1y1yd5ZD5yf.png',
    alt: 'Superbikes lined up on a desert mountain road',
    intro:
      'The Moto tribe brings together sport, naked and adventure riders across the UAE. Weekly night rides, mountain runs at first light and border crossings into Oman — run with a lead, a sweep and a safety standard that does not bend.',
    points: [
      {
        title: 'Group rides with real safety',
        body: 'Live map so the sweep sees every rider, one-press SOS that alerts the group with your location, and a full-gear rule on every ride.',
      },
      {
        title: 'Weekly rides and mountain majors',
        body: 'Regular evening rides out of Dubai plus bigger runs to Jebel Jais, Jebel Hafeet, Khor Fakkan and Fujairah through the riding season.',
      },
      {
        title: 'Your riding log',
        body: 'Distance, top speed and every run you have done, saved automatically after each ride.',
      },
    ],
    places: ['Al Qudra', 'Jebel Jais', 'Jebel Hafeet', 'Khor Fakkan', 'Fujairah', 'Hatta'],
  },
  {
    slug: 'karting',
    name: 'Karting',
    heading: 'Karting community and race nights in Dubai and the UAE',
    metaTitle: 'Karting Nights & Racing Community in Dubai, UAE',
    metaDescription:
      'Wheel-to-wheel karting in Dubai and the UAE. APEX organises karting race nights and group sessions for drivers who want to measure raw pace.',
    card: 'Wheel-to-wheel combat where raw talent is measured.',
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-karting.png-qgZtJi8BSrrDZhGJQTWCmBJV5ALJA9.jpeg',
    alt: 'Racing karts mid-corner at Dubai Kartdrome',
    intro:
      'Karting is where talent shows with no horsepower to hide behind. The Karting tribe books group sessions and race nights at UAE circuits and lets members settle who is actually quick.',
    points: [
      {
        title: 'Race nights, not rental laps',
        body: 'Group bookings with proper grids so you race people at your level instead of queueing for open sessions.',
      },
      {
        title: 'The entry point to the track',
        body: 'The cheapest way to learn racecraft before you take a car or bike to a full circuit track day.',
      },
      {
        title: 'Booked through the app',
        body: 'Sessions are posted in APEX — RSVP, see who is coming, and show up.',
      },
    ],
    places: ['Dubai Kartdrome', 'Dubai Autodrome', 'Yas Marina Circuit', 'Al Ain Raceway'],
  },
  {
    slug: 'offroad',
    name: 'Offroad',
    heading: 'Offroad and dune-driving community in the UAE and Oman',
    metaTitle: 'Offroad & Dune Driving Group in Dubai, UAE and Oman',
    metaDescription:
      'Built 4x4s, rally builds and dune trips across the UAE and Oman. Join APEX offroad convoys with experienced leads and live group tracking.',
    card: 'Built rigs chasing the dunes and the horizon off the tarmac.',
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-offroad-0UjHJtxljRz43vCprimWtwSQ1OXxsY.png',
    alt: 'A lifted rally-style roadster on a sandy lakeshore at sunset',
    intro:
      'The Offroad tribe takes built 4x4s and rally builds off the tarmac — dunes, wadis and the empty spaces between emirates — in convoys led by people who know the terrain.',
    points: [
      {
        title: 'Never alone in the sand',
        body: 'Convoys with a lead and a sweep, live tracking for every vehicle, and SOS if you get stuck or separated.',
      },
      {
        title: 'Trips for every level',
        body: 'From first dune runs to multi-day trips into Oman, each trip post says what the terrain asks of your build and your skill.',
      },
      {
        title: 'Builds and parts in one place',
        body: 'Members trade advice and parts in the APEX market.',
      },
    ],
    places: ['Al Qudra', 'Fossil Rock', 'Big Red', 'Liwa', 'Hatta', 'Wahiba Sands'],
  },
]

export const COMMUNITY_TILE = {
  name: 'Community',
  card: 'The meets, the nights, the people who live the machine.',
  img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-community.png-nsD35voV06hihiEr439JSAK1Zm5SKi.jpeg',
  alt: 'Members gathered around cars at Dubai Marina at night',
}

export const FAQ = [
  {
    q: 'What is APEX?',
    a: 'APEX is an invite-only motor community app for the GCC. It brings supercar owners, superbike riders, karting drivers and offroaders together for organised drives, rides and meets across the UAE and Oman.',
  },
  {
    q: 'How do I join APEX?',
    a: 'Download the app for iPhone or Android and request access through the APEX concierge. Membership is by invitation so every drive and ride is people who share the same standard.',
  },
  {
    q: 'What does the app do?',
    a: 'Drive and ride posts, one-tap RSVP, live group tracking on the road, one-press SOS to your group, a ride and drive log, and a members’ market for cars, bikes and parts.',
  },
  {
    q: 'Is APEX available on Android?',
    a: 'Yes. APEX is on the App Store for iPhone, and Android users install it directly from getapexmena.com/download.',
  },
  {
    q: 'How much does APEX cost?',
    a: 'The app is free to download. APEX Member, with member perks, is AED 49 a month or AED 399 a year.',
  },
  {
    q: 'Which countries does APEX cover?',
    a: 'APEX is built in the GCC for the GCC, with drives and rides across the UAE and Oman today.',
  },
]
