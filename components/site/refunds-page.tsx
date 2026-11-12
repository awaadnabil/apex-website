// /refunds and /ar/refunds: the APEX Member refund policy. App Store purchases are refunded by Apple; web and
// Android orders by Paddle.com, the Merchant of Record for those orders. Contact goes to /concierge.
import { COPY, type Locale } from '@/lib/site/content'
import { SubPage } from './sub-page'

type Block = { h: string; body: string[]; link?: { label: string; href: string } }

const REFUNDS: Record<Locale, { h1: string; updated: string; lead: string; blocks: Block[] }> = {
  en: {
    h1: 'Refund policy',
    updated: 'Last updated: 12 November 2026',
    lead: 'How cancelling and refunds work for APEX Member.',
    blocks: [
      {
        h: 'Cancel anytime',
        body: [
          'You can cancel your subscription at any time. Your membership stays active until the end of the period you have already paid for, and it does not renew after that.',
          'On iPhone, manage or cancel in Settings → Apple ID → Subscriptions.',
        ],
      },
      {
        h: 'Refunds within 14 days',
        body: [
          'If you bought an Annual or Founding Member plan, you can ask for a refund within 14 days of your first purchase. We review each request case by case.',
        ],
      },
      {
        h: 'Bought on iPhone (App Store)',
        body: [
          'App Store purchases are billed by Apple, so their refunds are handled by Apple. Request one from your Apple purchase history.',
        ],
        link: { label: 'Request a refund from Apple', href: 'https://reportaproblem.apple.com' },
      },
      {
        h: 'Bought on Android or the web',
        body: [
          'Android and web orders are processed by Paddle.com, our online reseller and Merchant of Record, and refunds for them are issued through Paddle.',
        ],
      },
      {
        h: 'Contact',
        body: ['Questions about a charge, a cancellation or a refund? The APEX concierge will help.'],
        link: { label: 'Contact the concierge', href: '/concierge' },
      },
    ],
  },
  ar: {
    h1: 'سياسة الاسترداد',
    updated: 'آخر تحديث: 12 نوفمبر 2026',
    lead: 'كيف يتم إلغاء عضوية APEX Member واسترداد المبالغ.',
    blocks: [
      {
        h: 'ألغِ في أي وقت',
        body: [
          'يمكنك إلغاء اشتراكك في أي وقت. وتبقى عضويتك فعّالة حتى نهاية الفترة التي دفعت مقابلها، ولا تتجدّد بعد ذلك.',
          'على iPhone، أدِر اشتراكك أو ألغِه من الإعدادات ← Apple ID ← الاشتراكات.',
        ],
      },
      {
        h: 'الاسترداد خلال 14 يوماً',
        body: [
          'إذا اشتريت الخطة السنوية أو خطة Founding Member، يمكنك طلب استرداد المبلغ خلال 14 يوماً من أول عملية شراء. وندرس كل طلب على حدة.',
        ],
      },
      {
        h: 'الشراء على iPhone ‏(App Store)',
        body: ['تُحصِّل Apple مبالغ مشتريات App Store، لذا تتولّى Apple استردادها. اطلب الاسترداد من سجل مشترياتك لدى Apple.'],
        link: { label: 'اطلب الاسترداد من Apple', href: 'https://reportaproblem.apple.com' },
      },
      {
        h: 'الشراء على Android أو عبر الويب',
        body: [
          'تُعالَج طلبات Android والويب عبر Paddle.com، الموزّع الإلكتروني لنا والتاجر المسجّل (Merchant of Record)، ويتم استرداد مبالغها عبر Paddle.',
        ],
      },
      {
        h: 'التواصل',
        body: ['لديك سؤال عن مبلغ أو إلغاء أو استرداد؟ فريق الدعم في APEX سيساعدك.'],
        link: { label: 'تواصل مع فريق الدعم (بالإنجليزية)', href: '/concierge' },
      },
    ],
  },
}

export function RefundsPage({ locale }: { locale: Locale }) {
  const c = COPY[locale]
  const r = REFUNDS[locale]
  const ar = locale === 'ar'
  return (
    <SubPage c={c} altHref={ar ? '/refunds' : '/ar/refunds'}>
      <section className="section apx-sub__section" aria-labelledby="refunds-h">
        <div className="wrap">
          <div className="apx-sub__col stack-6">
            <h1 id="refunds-h">{r.h1}</h1>
            <p className="t-lead">{r.lead}</p>
            <p className="muted">{r.updated}</p>
            {r.blocks.map((b) => (
              <div className="apx-sub__block stack-4" key={b.h}>
                <h2>{b.h}</h2>
                {b.body.map((t) => <p key={t}>{t}</p>)}
                {b.link ? (
                  <p>
                    <a className="link" href={b.link.href} rel={b.link.href.startsWith('http') ? 'noopener' : undefined}>
                      {b.link.label}
                    </a>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SubPage>
  )
}
