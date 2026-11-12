// /pricing and /ar/pricing: the APEX Member plans on the kit's plan cards. The benefits are the home page's
// own lines (lib/site/content.ts). Prices are the owner's (PRODUCT.md): AED 49 a month, AED 399 a year, and
// the Founding Member year at AED 299 for the first 50 members. No partner rates, and no percentages at all.
import { APP_STORE_URL, COPY, type Locale } from '@/lib/site/content'
import { SubPage } from './sub-page'

type Plan = { name: string; price: string; unit: string; line: string; badge?: string; featured?: boolean }

const PRICING: Record<
  Locale,
  {
    h1: string
    lead: string
    plansH: string
    plans: Plan[]
    renew: string
    benefitsH: string
    benefits: string[]
    howH: string
    note: string
    android: string
    links: { refunds: string; terms: string }
  }
> = {
  en: {
    h1: 'APEX Member',
    lead: 'One membership for the GCC’s motor community. Pay monthly, yearly, or lock in a Founding Member year while places last.',
    plansH: 'Plans',
    plans: [
      { name: 'Monthly', price: 'AED 49', unit: '/ month', line: 'Billed every month. Cancel anytime.' },
      { name: 'Annual', price: 'AED 399', unit: '/ year', line: 'Billed once a year. Cancel anytime.' },
      {
        name: 'Founding Member',
        price: 'AED 299',
        unit: '/ year',
        line: 'Limited to the first 50 members. Your price stays locked for as long as you stay subscribed.',
        badge: 'First 50',
        featured: true,
      },
    ],
    renew: 'Every plan renews automatically until you cancel. Cancel anytime and your membership stays active until the end of the period you paid for.',
    benefitsH: 'What members get',
    benefits: [
      'Community rides with a meetup, roll time and leader.',
      'FLY tracks the ride live, to the metre.',
      'XP for every ride you save, on your Ride Card.',
      'The top 3 make the Weekly Spotlight.',
      'Market for bikes, cars, parts and gear, from riders and verified dealers.',
      'APEX Card perks at dealers and Ride Stops: show the QR at the counter and your member perk applies.',
    ],
    howH: 'How to subscribe',
    note: 'On iPhone, subscribe in the APEX app. On Android, checkout is handled by Paddle.',
    android: 'Download for Android',
    links: { refunds: 'Refund policy', terms: 'Terms of Use' },
  },
  ar: {
    h1: 'APEX Member',
    lead: 'عضوية واحدة لمجتمع السيارات والدراجات في الخليج. ادفع شهرياً أو سنوياً، أو احجز سنة Founding Member ما دامت الأماكن متاحة.',
    plansH: 'الخطط',
    plans: [
      { name: 'شهري', price: '49 درهماً', unit: '/ شهرياً', line: 'يُدفع كل شهر. ألغِ في أي وقت.' },
      { name: 'سنوي', price: '399 درهماً', unit: '/ سنوياً', line: 'يُدفع مرة في السنة. ألغِ في أي وقت.' },
      {
        name: 'Founding Member',
        price: '299 درهماً',
        unit: '/ سنوياً',
        line: 'لأول 50 عضواً فقط. يبقى سعرك ثابتاً ما دمت مشتركاً.',
        badge: 'أول 50',
        featured: true,
      },
    ],
    renew: 'تتجدّد كل خطة تلقائياً حتى تلغيها. ألغِ في أي وقت وتبقى عضويتك فعّالة حتى نهاية الفترة التي دفعت مقابلها.',
    benefitsH: 'ما يحصل عليه الأعضاء',
    benefits: [
      'رحلات المجتمع بنقطة تجمّع وموعد انطلاق وقائد.',
      'يتتبّع FLY الرحلة مباشرةً، بدقة المتر.',
      'نقاط XP مع كل رحلة تحفظها، على Ride Card.',
      'أفضل 3 يدخلون Weekly Spotlight.',
      'سوق للدراجات والسيارات وقطع الغيار والمعدات، من الأعضاء ومن وكلاء موثّقين.',
      'مزايا APEX Card لدى الوكلاء ومحطات Ride Stops\u200F: اعرض رمز QR عند الكاشير وتُطبَّق ميزة العضوية.',
    ],
    howH: 'طريقة الاشتراك',
    note: 'على iPhone، اشترك من داخل تطبيق APEX. وعلى Android، تتولّى Paddle عملية الدفع.',
    android: 'نزّل لأجهزة Android',
    links: { refunds: 'سياسة الاسترداد', terms: 'شروط الاستخدام' },
  },
}

export function PricingPage({ locale }: { locale: Locale }) {
  const c = COPY[locale]
  const p = PRICING[locale]
  const ar = locale === 'ar'
  const base = ar ? '/ar' : ''
  return (
    <SubPage c={c} altHref={ar ? '/pricing' : '/ar/pricing'}>
      <section className="section apx-sub__section" aria-labelledby="pricing-h">
        <div className="wrap stack-6">
          <div className="apx-sub__col stack-4">
            <h1 id="pricing-h">{p.h1}</h1>
            <p className="t-lead">{p.lead}</p>
          </div>

          <h2 className="sr-only">{p.plansH}</h2>
          <div className="grid apx-plans">
            {p.plans.map((plan) => (
              <div className={`card card--plan span-4${plan.featured ? ' is-featured' : ''}`} key={plan.name}>
                <h3>
                  {plan.name}
                  {plan.badge ? <span className="badge">{plan.badge}</span> : null}
                </h3>
                <p className="price">
                  <span className="t-stat">{plan.price}</span>
                  <span className="muted">{plan.unit}</span>
                </p>
                <p className="muted">{plan.line}</p>
              </div>
            ))}
          </div>
          <p className="muted apx-sub__col">{p.renew}</p>

          <div className="apx-sub__col">
            <div className="apx-sub__block stack-4">
              <h2>{p.benefitsH}</h2>
              <ul className="checks">
                {p.benefits.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>

            <div className="apx-sub__block stack-4">
              <h2>{p.howH}</h2>
              <p className="t-lead">{p.note}</p>
              <div className="btn-row">
                <a className="apx-badge" href={APP_STORE_URL} rel="noopener">
                  <img src="/img/appstore-en.svg" alt={c.appStoreAlt} width={132} height={44} />
                </a>
                <a className="btn btn--secondary" href={c.androidHref}>{p.android}</a>
              </div>
              <p className="muted">
                <a className="link" href={`${base}/refunds`}>{p.links.refunds}</a>
                {' · '}
                <a className="link" href={`${base}/terms`}>{p.links.terms}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </SubPage>
  )
}
