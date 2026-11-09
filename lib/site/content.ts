// The home page's words, English and Arabic, as approved in the Stage 1 plan (v2).
// Only what the App Store images show or the owner confirmed. Anything else carries
// `assumed: true` and is rendered with data-assumed (listed in the report).
// Brand terms (FLY, XP, Ride Card, Weekly Spotlight, APEX Card, Ride Stops, Featured,
// APEX Member) stay in Latin inside Arabic: their Arabic names are not confirmed.

export type Locale = 'en' | 'ar'

export const APP_STORE_URL = 'https://apps.apple.com/app/apex-mena/id6773114294'

export type Copy = {
  locale: Locale
  dir: 'ltr' | 'rtl'
  home: string
  download: string
  androidHref: string
  altHome: string
  altLangLabel: string
  meta: { title: string; description: string; ogLocale: string }
  skip: string
  nav: {
    rides: string
    xp: string
    market: string
    card: string
    partners: string
    partnersMenu: { label: string; items: { title: string; line: string; href: string }[] }
    cta: string
    menu: string
  }
  appStoreAlt: string
  android: string
  /** h1: 48 characters at most in either language (the collage hero's stress limit, kept by break-ui) */
  hero: { h1: string; lead: string; proof: string; artLabel: string; cardTitle: string; cardChip: string; cardLines: [string, string, string] }
  rides: { h2: string; h2m: string; body: string; facts: string[]; link: string; artLabel: string }
  xp: {
    h2: string
    h2m: string
    cards: { title: string; body: string }[]
    spotlight: { head: string; week: string; rows: { rank: string; xp: number }[]; unit: string }
    share: { saved: string; xp: string; buttons: string[] }
    rideCardAlt: string
  }
  market: { h2: string; h2m: string; body: string; link: string; names: { title: string; line: string }[]; photoAlt: string; screenAlt: string }
  card: {
    h2: string
    body: string
    priceLabel: string
    price: string
    photoAlt: string
    qr: { show: string; code: string; next: string; perks: string; label: string }
  }
  partners: {
    statement: string
    sub: string
    cols: { title: string; body: string; assumed?: string }[]
    button: string
    screenAlt: string
    dash: { title: string; range: string; items: string[] }
  }
  form: {
    h2: string
    h2m: string
    labels: { business: string; name: string; type: string; city: string; email: string; phone: string; optional: string }
    types: { dealer: string; shop: string; ride_stop: string; choose: string }
    errors: { business: string; name: string; type: string; city: string; email: string; phone: string }
    button: string
    sending: string
    sent: string
    failed: string
    fix: string
    rate: string
    turnstile: string
    unavailable: string
    fallback: string
    noscript: string
    photoAlt: string
    honeypot: string
  }
  faq: { h2: string; line: string; link: string; install: { title: string; steps: string[]; link: string }; items: { q: string; a: string; assumedTail?: string }[] }
  close: { h2: string; line: string }
  footer: {
    lede: string
    cols: { title: string; links: { label: string; href: string }[] }[]
    rights: string
    privacy: string
    terms: string
  }
}

const en: Copy = {
  locale: 'en',
  dir: 'ltr',
  home: '/',
  download: '/download',
  androidHref: '/download',
  altHome: '/ar',
  altLangLabel: 'العربية',
  meta: {
    title: 'APEX: the motor community app for GCC riders and drivers',
    description:
      'Group rides, FLY live tracking, XP and the Weekly Spotlight, the Market and APEX Card perks. On iPhone and Android.',
    ogLocale: 'en_AE',
  },
  skip: 'Skip to content',
  nav: {
    rides: 'Rides',
    xp: 'XP',
    market: 'Market',
    card: 'APEX Card',
    partners: 'Partners',
    partnersMenu: {
      label: 'For partners',
      items: [
        { title: 'Dealers and shops', line: 'Pay only on member sales', href: '#partners' },
        { title: 'Ride Stops', line: 'Cafés and restaurants on the route', href: '#partners' },
        { title: 'Partner enquiry', line: 'Goes straight to the APEX team', href: '#partner' },
      ],
    },
    cta: 'Download APEX',
    menu: 'Menu',
  },
  appStoreAlt: 'Download on the App Store',
  android: 'Download for Android',
  hero: {
    h1: 'Motor community app for GCC riders and drivers',
    lead: 'Find your next group ride, see when it rolls and who leads it, then track it live with FLY. Every saved ride earns XP. Built in Dubai.',
    proof: 'iPhone on the App Store. Android as a direct download.',
    artLabel: 'FLY tracking a ride live on the map, and the ride being saved for 150 XP',
    cardTitle: 'Ride saved',
    cardChip: '+150 XP',
    cardLines: ['Solo ride, Ride Card for 9 Nov', 'Distance, time and top speed logged', '+150 XP earned'],
  },
  rides: {
    h2: 'Community rides with a meetup, roll time and leader.',
    h2m: 'FLY tracks the ride live, to the metre.',
    body: 'Each ride shows the day, time and meeting point, how many riders have joined and who leads. Tap Request to join.',
    facts: ['On the road, FLY shows speed, distance, time and peak G live.', 'Stop FLY and the ride is saved to your Ride Card.'],
    link: 'Download APEX to join a ride',
    artLabel: 'Two APEX screens: the next ride on Home, and the saved Ride Card with +150 XP',
  },
  xp: {
    h2: 'XP for every ride you save.',
    h2m: 'The top 3 make the Weekly Spotlight.',
    cards: [
      { title: 'Puts each ride on a Ride Card', body: 'Distance, time, top speed, average speed, riders and the XP it earned.' },
      { title: "Shows last week's top riders", body: 'The Weekly Spotlight on Home lists the top 3 by XP.' },
      { title: 'Shares the card in one tap', body: 'Instagram story, WhatsApp, Save to Photos or Post to my profile.' },
    ],
    spotlight: {
      head: 'Weekly Spotlight',
      week: "Last week's top riders",
      rows: [
        { rank: '1', xp: 200 },
        { rank: '2', xp: 165 },
        { rank: '3', xp: 140 },
      ],
      unit: 'XP',
    },
    share: { saved: 'Ride saved', xp: '+150 XP earned', buttons: ['Instagram story', 'WhatsApp', 'Save to Photos', 'Post to my profile'] },
    rideCardAlt: 'A saved Ride Card showing +150 XP earned',
  },
  market: {
    h2: 'Market for bikes, cars, parts and gear.',
    h2m: 'From riders and verified dealers.',
    body: 'Search bikes, cars, parts and dealers, or browse Supercars, Cars, Bikes, Parts and Gear.',
    link: 'See the Market in the app',
    names: [
      { title: 'Search', line: 'Bikes, cars, parts and dealers' },
      { title: 'Spotlight', line: 'Shuffles every visit' },
      { title: 'New on Market', line: 'Fresh listings, tagged' },
      { title: 'Verified dealers', line: 'Have their own row' },
    ],
    photoAlt: 'Riders with their sport bikes on a mountain road',
    screenAlt: 'The APEX Market screen with search, Spotlight and categories',
  },
  card: {
    h2: 'APEX Card perks at dealers and Ride Stops',
    body: 'Show the QR at the counter and your member perk applies. The code refreshes every few seconds. Ride Stops are cafés, restaurants and gaming cafés on your route.',
    priceLabel: 'APEX Member',
    price: 'AED 49 a month or AED 399 a year',
    photoAlt: 'Riders and their cars and bikes at a night meet by the marina',
    qr: { show: 'Show this at the counter', code: '357 417', next: 'New code in', perks: 'Perks used', label: 'The APEX Card QR with a six-digit code that renews' },
  },
  partners: {
    statement: 'You only pay on member sales.',
    sub: 'No listing fee and no monthly fee, for dealers, shops and Ride Stops.',
    cols: [
      {
        title: 'Dealers and shops on the Market',
        body: 'Members scan your QR at the counter, so each member sale is tracked. Your dashboard counts listing views, WhatsApp taps, calls, saves and showroom visits.',
      },
      {
        title: 'Ride Stops in the community',
        body: 'Cafés, restaurants and gaming cafés where members stop.',
        assumed: 'Your first month as Featured is free.',
      },
    ],
    button: 'Send a partner enquiry',
    screenAlt: 'The APEX dealer dashboard counting listing views, WhatsApp taps, calls and showroom visits',
    dash: { title: 'Dealer dashboard', range: '7 days · 30 days', items: ['Listing views', 'WhatsApp taps', 'Calls', 'Saves', 'Showroom visits', 'Perk redemptions'] },
  },
  form: {
    h2: 'Partner enquiry.',
    h2m: 'It goes straight to the APEX team.',
    labels: {
      business: 'Business name',
      name: 'Your name',
      type: 'Partner type',
      city: 'City',
      email: 'Email',
      phone: 'Phone or WhatsApp',
      optional: 'optional',
    },
    types: { dealer: 'Dealer', shop: 'Shop', ride_stop: 'Ride Stop', choose: 'Choose one' },
    errors: {
      business: 'Write your business name.',
      name: 'Write your name.',
      type: 'Choose dealer, shop or Ride Stop.',
      city: 'Write the city your business is in.',
      email: 'Write an email address with an @, like name@business.ae.',
      phone: 'Write the number with digits only, like +971 50 123 4567.',
    },
    button: 'Send partner enquiry',
    sending: 'Sending',
    sent: 'Your partner enquiry is in. The APEX team will contact you.',
    failed: "That didn't send. Your details are still here, so try again.",
    fix: '{n} fields to fix.',
    rate: 'Too many enquiries from this connection. Try again in ten minutes.',
    turnstile: 'The security check did not pass. Tick it again, then send.',
    unavailable: "Enquiries can't be sent right now. Your details are still here, so try again later.",
    fallback: 'Or reach the APEX concierge',
    noscript: 'Sending this form needs JavaScript. Turn it on, or reach the APEX concierge.',
    photoAlt: 'Supercars driving on Sheikh Zayed Road at dusk',
    honeypot: 'Leave this empty',
  },
  faq: {
    h2: 'Questions',
    line: 'The things riders and partners ask first.',
    link: 'Ask the concierge',
    install: {
      title: 'Android install, in three steps',
      steps: ['Download the file. Chrome warns about every app from outside the Play Store: choose Download anyway.', 'Open it and allow the install. You only do this once.', 'Open APEX and sign in. Updates arrive automatically.'],
      link: 'See the Android steps',
    },
    items: [
      {
        q: 'How do I install the APEX app on Android?',
        a: 'APEX for Android is a direct download, not on Google Play. Get the file from the download page, allow the install once, then sign in.',
      },
      {
        q: 'Is the Android file safe to install?',
        a: "It's the same APEX app, delivered without a storefront in between. Chrome's warning appears for every app installed from outside the Play Store.",
      },
      { q: 'What does APEX Member cost riders?', a: 'AED 49 a month or AED 399 a year, bought inside the iPhone app. On Android, speak to an organiser.' },
      {
        q: 'What do partners pay for the app?',
        a: "Only on sales to APEX members, tracked when members scan your QR. There's no listing fee and no monthly fee.",
      },
      {
        q: 'What is a Ride Stop in the app?',
        a: "A café, restaurant or gaming café on members' routes that offers APEX Card perks.",
        assumedTail: 'A new Ride Stop gets its first month as Featured free.',
      },
    ],
  },
  close: { h2: 'Download APEX for iPhone or Android', line: 'iPhone on the App Store. Android as a direct download.' },
  footer: {
    lede: 'The motor community app for riders and drivers in the GCC.',
    cols: [
      {
        title: 'App',
        links: [
          { label: 'Rides', href: '#rides' },
          { label: 'XP', href: '#xp' },
          { label: 'Market', href: '#market' },
          { label: 'APEX Card', href: '#card' },
        ],
      },
      {
        title: 'Partners',
        links: [
          { label: 'Terms for partners', href: '#partners' },
          { label: 'Partner enquiry', href: '#partner' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'Download', href: '/download' },
          { label: 'Concierge', href: '/concierge' },
          { label: 'Questions', href: '#faq' },
        ],
      },
    ],
    rights: '© 2026 APEX, Dubai',
    privacy: 'Privacy',
    terms: 'Terms',
  },
}

const ar: Copy = {
  locale: 'ar',
  dir: 'rtl',
  home: '/ar',
  download: '/ar/download',
  androidHref: '/ar/download#android',
  altHome: '/',
  altLangLabel: 'English',
  meta: {
    title: 'APEX: تطبيق مجتمع السيارات والدراجات في الخليج',
    description:
      'رحلات جماعية، وتتبّع مباشر مع FLY، ونقاط XP وWeekly Spotlight، والسوق، ومزايا APEX Card. على iPhone وAndroid.',
    ogLocale: 'ar_AE',
  },
  skip: 'انتقل إلى المحتوى',
  nav: {
    rides: 'الرحلات',
    xp: 'XP',
    market: 'السوق',
    card: 'APEX Card',
    partners: 'الشركاء',
    partnersMenu: {
      label: 'للشركاء',
      items: [
        { title: 'الوكلاء والمتاجر', line: 'تدفع على مبيعات الأعضاء فقط', href: '#partners' },
        { title: 'Ride Stops', line: 'مقاهٍ ومطاعم على الطريق', href: '#partners' },
        { title: 'طلب شراكة', line: 'يصل مباشرةً إلى فريق APEX', href: '#partner' },
      ],
    },
    cta: 'نزّل APEX',
    menu: 'القائمة',
  },
  appStoreAlt: 'حمّل APEX من App Store',
  android: 'نزّل لأجهزة Android',
  hero: {
    h1: 'تطبيق مجتمع السيارات والدراجات في الخليج',
    lead: 'اعثر على رحلتك الجماعية التالية، واعرف موعد انطلاقها ومن يقودها، ثم تابعها مباشرةً مع FLY. كل رحلة تحفظها تمنحك نقاط XP. صُنع في دبي.',
    proof: '‏iPhone عبر App Store، وAndroid بتنزيل مباشر.',
    artLabel: 'FLY يتتبّع رحلة مباشرةً على الخريطة، ثم تُحفظ الرحلة مقابل 150 نقطة XP',
    cardTitle: 'حُفظت الرحلة',
    cardChip: '+150 XP',
    cardLines: ['رحلة فردية، Ride Card ليوم 9 نوفمبر', 'سُجّلت المسافة والوقت والسرعة القصوى', '\u2066+150 XP\u2069'],
  },
  rides: {
    h2: 'رحلات المجتمع بنقطة تجمّع وموعد انطلاق وقائد.',
    h2m: 'يتتبّع FLY الرحلة مباشرةً، بدقة المتر.',
    body: 'تعرض كل رحلة اليوم والوقت ونقطة التجمّع، وعدد المنضمّين ومن يقودها. اضغط Request للانضمام.',
    facts: ['وعلى الطريق، يعرض FLY السرعة والمسافة والوقت وقوة التسارع (G) مباشرةً.', 'أوقف FLY فتُحفظ الرحلة على Ride Card.'],
    link: 'نزّل APEX وانضم إلى رحلة',
    artLabel: 'شاشتان من APEX: الرحلة التالية في الرئيسية، وبطاقة Ride Card المحفوظة مع ‎+150 XP',
  },
  xp: {
    h2: 'نقاط XP مع كل رحلة تحفظها.',
    h2m: 'أفضل 3 يدخلون Weekly Spotlight.',
    cards: [
      { title: 'تُسجَّل كل رحلة على Ride Card', body: 'المسافة والوقت والسرعة القصوى ومتوسط السرعة وعدد الراكبين ونقاط XP التي حصدتها.' },
      { title: 'تعرض أفضل الراكبين في الأسبوع الماضي', body: 'تُظهر Weekly Spotlight في الصفحة الرئيسية أفضل 3 حسب نقاط XP.' },
      { title: 'تشارك البطاقة بلمسة واحدة', body: 'قصة Instagram أو WhatsApp أو الحفظ في الصور أو النشر في ملفك.' },
    ],
    spotlight: {
      head: 'Weekly Spotlight',
      week: 'أفضل الراكبين في الأسبوع الماضي',
      rows: [
        { rank: '1', xp: 200 },
        { rank: '2', xp: 165 },
        { rank: '3', xp: 140 },
      ],
      unit: 'XP',
    },
    share: { saved: 'حُفظت الرحلة', xp: '‎+150 XP', buttons: ['قصة Instagram', 'WhatsApp', 'الحفظ في الصور', 'النشر في ملفي'] },
    rideCardAlt: 'بطاقة Ride Card محفوظة تُظهر ‎+150 XP',
  },
  market: {
    h2: 'سوق للدراجات والسيارات وقطع الغيار والمعدات.',
    h2m: 'من الأعضاء ومن وكلاء موثّقين.',
    body: 'ابحث عن الدراجات والسيارات وقطع الغيار والوكلاء، أو تصفّح السيارات الفارهة والسيارات والدراجات والقطع والمعدات.',
    link: 'شاهد السوق في التطبيق',
    names: [
      { title: 'البحث', line: 'دراجات وسيارات وقطع غيار ووكلاء' },
      { title: 'Spotlight', line: 'تتغيّر مع كل زيارة' },
      { title: 'جديد في السوق', line: 'إعلانات جديدة بعلامة واضحة' },
      { title: 'الوكلاء الموثّقون', line: 'لهم قسمهم الخاص' },
    ],
    photoAlt: 'راكبون مع دراجاتهم الرياضية على طريق جبلي',
    screenAlt: 'شاشة السوق في APEX مع البحث وSpotlight والفئات',
  },
  card: {
    h2: 'مزايا APEX Card لدى الوكلاء ومحطات Ride Stops',
    body: 'اعرض رمز QR عند الكاشير وتُطبَّق ميزة العضوية. يتجدّد الرمز كل بضع ثوانٍ. ‏Ride Stops هي المقاهي والمطاعم ومقاهي الألعاب على طريقك.',
    priceLabel: 'APEX Member',
    price: '49 درهماً شهرياً أو 399 درهماً سنوياً',
    photoAlt: 'راكبون مع سياراتهم ودراجاتهم في لقاء ليلي عند المارينا',
    qr: { show: 'اعرض هذا عند الكاشير', code: '357 417', next: 'رمز جديد خلال', perks: 'المزايا المستخدمة', label: 'رمز QR لبطاقة APEX Card مع رمز من ستة أرقام يتجدّد' },
  },
  partners: {
    statement: 'تدفع فقط على مبيعات الأعضاء.',
    sub: 'بلا رسوم إدراج وبلا رسوم شهرية، للوكلاء والمتاجر ومحطات Ride Stops.',
    cols: [
      {
        title: 'الوكلاء والمتاجر في السوق',
        body: 'يمسح الأعضاء رمز QR عند الكاشير فتُسجَّل كل عملية بيع لهم. وتحصي لوحتك مشاهدات الإعلانات ونقرات WhatsApp والمكالمات والحفظ وزيارات المعرض.',
      },
      {
        title: 'محطات Ride Stops في المجتمع',
        body: 'مقاهٍ ومطاعم ومقاهي ألعاب يتوقف فيها الأعضاء.',
        assumed: 'وشهرك الأول ضمن Featured مجاني.',
      },
    ],
    button: 'أرسل طلب شراكة',
    screenAlt: 'لوحة الوكيل في APEX تحصي مشاهدات الإعلانات ونقرات WhatsApp والمكالمات وزيارات المعرض',
    dash: { title: 'لوحة الوكيل', range: '7 أيام · 30 يوماً', items: ['مشاهدات الإعلانات', 'نقرات WhatsApp', 'المكالمات', 'مرات الحفظ', 'زيارات المعرض', 'استخدام المزايا'] },
  },
  form: {
    h2: 'طلب شراكة.',
    h2m: 'يصل مباشرةً إلى فريق APEX.',
    labels: {
      business: 'اسم النشاط التجاري',
      name: 'اسمك',
      type: 'نوع الشراكة',
      city: 'المدينة',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف أو WhatsApp',
      optional: 'اختياري',
    },
    types: { dealer: 'وكيل', shop: 'متجر', ride_stop: 'Ride Stop', choose: 'اختر واحداً' },
    errors: {
      business: 'اكتب اسم نشاطك التجاري.',
      name: 'اكتب اسمك.',
      type: 'اختر وكيلاً أو متجراً أو Ride Stop.',
      city: 'اكتب المدينة التي يقع فيها نشاطك.',
      email: 'اكتب بريداً إلكترونياً يحتوي على @، مثل \u2066name@business.ae\u2069.',
      phone: 'اكتب الرقم بالأرقام فقط، مثل \u2066+971 50 123 4567\u2069.',
    },
    button: 'أرسل طلب الشراكة',
    sending: 'جارٍ الإرسال',
    sent: 'وصل طلب الشراكة، وسيتواصل معك فريق APEX.',
    failed: 'لم يُرسَل الطلب. بياناتك ما زالت هنا، فحاول مجدداً.',
    fix: 'حقول تحتاج إلى تصحيح: {n}.',
    rate: 'طلبات كثيرة من هذا الاتصال. حاول مجدداً بعد عشر دقائق.',
    turnstile: 'لم يكتمل التحقق الأمني. أكمله مرة أخرى ثم أرسل.',
    unavailable: 'تعذّر إرسال الطلبات الآن. بياناتك ما زالت هنا، فحاول لاحقاً.',
    fallback: 'أو تواصل مع فريق الدعم (بالإنجليزية)',
    noscript: 'يحتاج إرسال هذا النموذج إلى JavaScript. فعّله، أو تواصل مع فريق الدعم.',
    photoAlt: 'سيارات خارقة على شارع الشيخ زايد عند الغروب',
    honeypot: 'اترك هذا الحقل فارغاً',
  },
  faq: {
    h2: 'أسئلة',
    line: 'ما يسأل عنه الراكبون والشركاء أولاً.',
    link: 'اسأل فريق الدعم (بالإنجليزية)',
    install: {
      title: 'التثبيت على Android في ثلاث خطوات',
      steps: ['نزّل الملف. يحذّر Chrome من كل تطبيق من خارج متجر Play، فاختر «التنزيل على أي حال».', 'افتحه واسمح بالتثبيت. يحدث هذا مرة واحدة فقط.', 'افتح APEX وسجّل الدخول. وتصلك التحديثات تلقائياً.'],
      link: 'خطوات Android كاملة',
    },
    items: [
      {
        q: 'كيف أثبّت تطبيق APEX على Android؟',
        a: 'تطبيق APEX لأجهزة Android متاح بتنزيل مباشر وليس على Google Play. نزّل الملف من صفحة التنزيل، واسمح بالتثبيت مرة واحدة، ثم سجّل الدخول.',
      },
      {
        q: 'هل ملف تطبيق Android آمن للتثبيت؟',
        a: 'إنه تطبيق APEX نفسه، يصلك دون متجر بينك وبينه. ويظهر تحذير Chrome لكل تطبيق يُثبَّت من خارج متجر Play.',
      },
      { q: 'كم تكلّف عضوية APEX Member للراكبين؟', a: '‏49 درهماً شهرياً أو 399 درهماً سنوياً، والاشتراك من داخل تطبيق iPhone. وعلى Android، تحدّث إلى أحد المنظّمين.' },
      {
        q: 'ماذا يدفع الشركاء مقابل التطبيق؟',
        a: 'تدفع فقط على المبيعات لأعضاء APEX، وتُسجَّل حين يمسح العضو رمز QR. لا رسوم إدراج ولا رسوم شهرية.',
      },
      {
        q: 'ما هي Ride Stop في التطبيق؟',
        a: 'مقهى أو مطعم أو مقهى ألعاب على طرق الأعضاء يقدّم مزايا APEX Card.',
        assumedTail: 'وتحصل كل Ride Stop جديدة على شهرها الأول ضمن Featured مجاناً.',
      },
    ],
  },
  close: { h2: 'نزّل APEX على iPhone أو Android', line: '‏iPhone عبر App Store، وAndroid بتنزيل مباشر.' },
  footer: {
    lede: 'تطبيق مجتمع السيارات والدراجات للراكبين والسائقين في الخليج.',
    cols: [
      {
        title: 'التطبيق',
        links: [
          { label: 'الرحلات', href: '#rides' },
          { label: 'XP', href: '#xp' },
          { label: 'السوق', href: '#market' },
          { label: 'APEX Card', href: '#card' },
        ],
      },
      {
        title: 'الشركاء',
        links: [
          { label: 'شروط الشركاء', href: '#partners' },
          { label: 'طلب شراكة', href: '#partner' },
        ],
      },
      {
        title: 'المساعدة',
        links: [
          { label: 'التنزيل', href: '/ar/download' },
          { label: 'الدعم (بالإنجليزية)', href: '/concierge' },
          { label: 'أسئلة', href: '#faq' },
        ],
      },
    ],
    rights: '© 2026 APEX، دبي',
    privacy: 'الخصوصية',
    terms: 'الشروط',
  },
}

export const COPY: Record<Locale, Copy> = { en, ar }
