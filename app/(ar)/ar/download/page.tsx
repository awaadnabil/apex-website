// /ar/download: the Arabic version of /download. The same facts, the same App Store link and the same
// APK (NEXT_PUBLIC_APK_URL, else the GitHub release), translated, in true RTL on the kit.
import type { Metadata } from 'next'
import { APP_STORE_URL, COPY } from '@/lib/site/content'
import { SITE_URL, kitViewport } from '@/lib/site/metadata'

const APK_URL =
  process.env.NEXT_PUBLIC_APK_URL ?? 'https://github.com/awaadnabil/apex-releases/releases/latest/download/apex.apk'

const STEPS = [
  {
    n: '01',
    title: 'نزّل الملف',
    body: 'سيحذّرك Chrome من أن هذا النوع من الملفات قد يضرّ جهازك، ويظهر هذا التحذير لكل تطبيق يُثبَّت من خارج متجر Play. اختر «التنزيل على أي حال».',
  },
  {
    n: '02',
    title: 'اسمح بالتثبيت',
    body: 'افتح الملف الذي نزّلته. سيطلب Android إذناً بالتثبيت من هذا المصدر، فاسمح بذلك. يحدث هذا مرة واحدة فقط.',
  },
  {
    n: '03',
    title: 'افتح APEX',
    body: 'سجّل الدخول بالحساب نفسه الذي تستخدمه في أي مكان آخر. وتصلك التحديثات تلقائياً من الآن فصاعداً.',
  },
]

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'نزّل APEX',
  description: 'ثبّت APEX على iPhone أو Android، تطبيق مجتمع السيارات والدراجات في الخليج.',
  alternates: { canonical: '/ar/download', languages: { en: '/download', ar: '/ar/download' } },
  icons: { icon: [{ url: '/img/apex-peak.svg', type: 'image/svg+xml' }] },
  openGraph: {
    title: 'نزّل APEX',
    description: 'ثبّت APEX على iPhone أو Android.',
    url: '/ar/download',
    siteName: 'APEX',
    type: 'website',
    locale: 'ar_AE',
    images: [{ url: '/og-ar.jpg', width: 1200, height: 630 }],
  },
}
export const viewport = kitViewport

export default function ArabicDownload() {
  const c = COPY.ar
  return (
    <>
      <header className="nav">
        <div className="wrap nav__bar">
          <a className="skip-link" href="#top">{c.skip}</a>
          <a className="nav__logo" href="/ar" aria-label="APEX" dir="ltr">
            <img className="apx-peak" src="/img/apex-peak.svg" alt="" width={32} height={28} />
            <img className="apx-wordmark" src="/img/apex-wordmark.svg" alt="" width={110} height={11} />
          </a>
          <div className="nav__actions">
            <a className="nav__link" href="/download" hrefLang="en" lang="en">English</a>
          </div>
        </div>
      </header>
      <main id="top" className="apx-sub">
        <section className="section apx-sub__section" aria-labelledby="dl-h">
          <div className="wrap">
            <div className="apx-sub__col stack-6">
              <h1 id="dl-h">نزّل APEX</h1>
              <p className="t-lead">الرحلات والمسارات والخريطة المباشرة وكل الأعضاء، على الجهاز الذي في جيبك.</p>

              <div className="apx-sub__block stack-4" id="iphone">
                <h2>iPhone</h2>
                <p>متوفر على App Store، ومن هنا تُشترى العضوية.</p>
                <div className="btn-row">
                  <a className="apx-badge" href={APP_STORE_URL} rel="noopener">
                    <img src="/img/appstore-en.svg" alt={c.appStoreAlt} width={132} height={44} />
                  </a>
                </div>
              </div>

              <div className="apx-sub__block stack-4" id="android">
                <h2>Android</h2>
                <p>‏APEX غير متوفر على متجر Play. ثبّته مباشرةً من هنا، فهو التطبيق نفسه دون متجر بينك وبينه.</p>
                <div className="btn-row">
                  <a className="btn btn--primary" href={APK_URL}>{c.android}</a>
                </div>
                <ol className="apx-steps">
                  {STEPS.map((s) => (
                    <li key={s.n}>
                      <span className="apx-steps__n" dir="ltr">{s.n}</span>
                      <div>
                        <h3>{s.title}</h3>
                        <p>{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="apx-sub__note stack-2">
                  <h3>العضوية على Android</h3>
                  <p>انضم إلى رحلات بلا حدود، وتابع المجتمع، واستخدم الخريطة المباشرة. وللحصول على APEX MEMBER، تحدّث إلى أحد المنظّمين.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="apx-sub__foot">
        <div className="wrap">
          <span>{c.footer.rights}</span>
          <a href="/ar">الرئيسية</a>
          <a href="/privacy">{c.footer.privacy}</a>
          <a href="/terms">{c.footer.terms}</a>
        </div>
      </footer>
    </>
  )
}
