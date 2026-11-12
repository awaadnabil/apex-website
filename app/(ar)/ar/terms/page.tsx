// /ar/terms: the Arabic version of /terms, section for section (including 8, the Paddle section), in true
// RTL on the kit. The English /terms is the original; keep the two in step when either changes.
import { COPY } from '@/lib/site/content'
import { kitViewport, subPageMetadata } from '@/lib/site/metadata'
import { SubPage } from '@/components/site/sub-page'

export const metadata = subPageMetadata({
  locale: 'ar',
  path: '/ar/terms',
  en: '/terms',
  ar: '/ar/terms',
  title: 'شروط الاستخدام · APEX',
  description: 'شروط استخدام تطبيق APEX، بما فيها الاشتراكات وطلبات الويب وAndroid عبر Paddle.com.',
})
export const viewport = kitViewport

const SECTIONS: { h: string; body: string[] }[] = [
  {
    h: '1. قبول الشروط',
    body: ['بتنزيلك APEX أو استخدامه، فإنك توافق على شروط الاستخدام هذه. وإن لم توافق عليها، فلا تستخدم التطبيق.'],
  },
  {
    h: '2. استخدام التطبيق',
    body: ['‏APEX مجتمع لعشّاق السيارات والدراجات في الخليج. يجب أن يكون عمرك 18 عاماً أو أكثر. وتوافق على استخدام التطبيق بشكل قانوني ولائق.'],
  },
  {
    h: '3. الاشتراكات والمدفوعات',
    body: [
      'يقدّم APEX اشتراكات تتجدّد تلقائياً تُعالَج عبر الشراء داخل التطبيق من Apple. وتتجدّد الاشتراكات ما لم تُلغَ قبل 24 ساعة من نهاية الفترة الحالية. أدِرها من الإعدادات ← Apple ID ← الاشتراكات.',
    ],
  },
  {
    h: '4. محتوى المستخدم',
    body: ['تحتفظ بملكية المحتوى الذي تنشره. وبنشرك له، تمنح APEX ترخيصاً بعرض هذا المحتوى داخل التطبيق.'],
  },
  {
    h: '5. معايير المجتمع',
    body: ['يُحظر التحرّش والرسائل المزعجة والمحتوى غير القانوني، وقد يؤدي إلى إنهاء الحساب فوراً.'],
  },
  {
    h: '6. إخلاء المسؤولية',
    body: [
      'ينظّم APEX رحلات المجتمع لأغراض إعلامية فقط. ولسنا مسؤولين عن أي حوادث أو أضرار أثناء الرحلات. قُد دائماً بأمان وضمن قوانين المرور المحلية.',
    ],
  },
  {
    h: '7. الإنهاء',
    body: ['يجوز لنا تعليق حسابك أو إنهاؤه عند المخالفة. ويمكنك حذف حسابك في أي وقت من إعدادات التطبيق.'],
  },
  {
    h: '8. طلبات الويب وAndroid',
    body: [
      'تتم عملية الطلب لدينا عبر الموزّع الإلكتروني Paddle.com. وPaddle.com هو التاجر المسجّل (Merchant of Record) لجميع طلباتنا عبر الويب وAndroid. وتتولّى Paddle جميع استفسارات خدمة العملاء وعمليات الإرجاع.',
    ],
  },
]

export default function ArabicTerms() {
  const c = COPY.ar
  return (
    <SubPage c={c} altHref="/terms">
      <section className="section apx-sub__section" aria-labelledby="terms-h">
        <div className="wrap">
          <div className="apx-sub__col stack-6">
            <h1 id="terms-h">شروط الاستخدام</h1>
            <p className="muted">آخر تحديث: نوفمبر 2026</p>
            {SECTIONS.map((s) => (
              <div className="apx-sub__block stack-4" key={s.h}>
                <h2>{s.h}</h2>
                {s.body.map((t) => <p key={t}>{t}</p>)}
              </div>
            ))}
            <div className="apx-sub__block stack-4">
              <h2>9. التواصل</h2>
              <p><a className="link" href="mailto:support@getapexmena.com" dir="ltr">support@getapexmena.com</a></p>
              <p className="muted">APEX Motors GCC · دبي، الإمارات العربية المتحدة</p>
            </div>
          </div>
        </div>
      </section>
    </SubPage>
  )
}
