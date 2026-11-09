import type { Locale } from '@/lib/site/content'

const stories = {
  en: [
    { label: 'Hyperspace entry', title: 'Leave ordinary behind.', chapters: ['Find your people.', 'Make every ride count.', 'Enter the world of APEX.'], detail: ['One community. A shared direction.', 'From the first kilometre to the next milestone.', 'Your next chapter starts on the road.'] },
    { label: 'Connected dimensions', title: 'More than one dimension.', chapters: ['Ride together.', 'Build your reputation.', 'Unlock more.'], detail: ['Discover rides and keep your crew connected.', 'Turn time on the road into XP and a ride story worth sharing.', 'Rides, riders and rewards. Connected through APEX.'] },
    { label: 'Always evolving', title: 'One app. New possibilities.', chapters: ['Discover.', 'Connect.', 'Earn.', 'Belong.'], detail: ['Find your next ride.', 'Keep your crew in view.', 'Make your progress visible.', 'Bring your world together.'] },
    { label: 'A world in motion', title: 'Find your next horizon.', chapters: ['The open road.', 'The night meet.', 'The convoy.'], detail: ['A new route. A familiar feeling.', 'Good machines. Better company.', 'Every journey is better together.'] },
  ],
  ar: [
    { label: 'بداية الرحلة', title: 'اترك المألوف خلفك.', chapters: ['اعثر على مجتمعك.', 'اجعل كل رحلة تُحسب.', 'ادخل عالم APEX.'], detail: ['مجتمع واحد. وجهة مشتركة.', 'من أول كيلومتر إلى الإنجاز التالي.', 'فصلك القادم يبدأ على الطريق.'] },
    { label: 'أبعاد مترابطة', title: 'أكثر من بُعد واحد.', chapters: ['انطلق معاً.', 'ابنِ سمعتك.', 'اكتشف المزيد.'], detail: ['اكتشف الرحلات وابقَ على تواصل مع مجموعتك.', 'حوّل وقتك على الطريق إلى نقاط وقصة تستحق المشاركة.', 'رحلات ودرّاجون ومكافآت يجمعها APEX.'] },
    { label: 'تطور مستمر', title: 'تطبيق واحد. فرص جديدة.', chapters: ['اكتشف.', 'تواصل.', 'اكسب.', 'انتمِ.'], detail: ['اعثر على رحلتك القادمة.', 'ابقَ قريباً من مجموعتك.', 'اجعل تقدمك مرئياً.', 'اجمع عالمك معاً.'] },
    { label: 'عالم يتحرك', title: 'اكتشف أفقك القادم.', chapters: ['الطريق المفتوح.', 'اللقاء الليلي.', 'الموكب.'], detail: ['طريق جديد. شعور مألوف.', 'دراجات رائعة. ورفقة أروع.', 'كل رحلة أجمل معاً.'] },
  ],
}
const photos = ['standin-riders-mountain', 'standin-night-meet', 'standin-convoy']
const screens = ['screen-home', 'screen-fly', 'screen-ridecard', 'screen-market']
const destinations = ['rides', 'xp', 'card', 'partners']

export function DimensionSection({ index, locale }: { index: number; locale: Locale }) {
  const story = stories[locale][index]
  const ar = locale === 'ar'
  return (
    <section className={`dimension-section dimension-section--${index}`} data-dimension={index} aria-labelledby={`dimension-title-${index}`}>
      <div className="dimension-heading">
        <p className="dimension-eyebrow">APEX / {story.label}</p>
        <h2 id={`dimension-title-${index}`}>{story.title}</h2>
      </div>
      <div className="dimension-stage" data-dimension-stage aria-hidden="true" />
      <div className="dimension-chapters">
        {story.chapters.map((title, chapter) => (
          <article className="dimension-chapter" data-chapter={chapter} key={title}>
            <p className="dimension-chapter-number" dir="ltr">{String(chapter + 1).padStart(2, '0')} / {String(story.chapters.length).padStart(2, '0')}</p>
            <h3 data-decode={title}>{title}</h3>
            <p>{story.detail[chapter]}</p>
            {index === 2 && <img className="dimension-screen" src={`/img/${screens[chapter]}-360.webp`} width={180} height={378} alt={title} loading="lazy" />}
            {index === 3 && <img className="dimension-photo" src={`/img/${photos[chapter]}-640.webp`} width={640} height={357} alt={story.detail[chapter]} loading="lazy" />}
          </article>
        ))}
      </div>
      <div className="dimension-status">
        <span dir="ltr">{String(index + 1).padStart(2, '0')} / 04</span>
        <span className="dimension-progress" aria-hidden="true"><i /></span>
        <span>{ar ? 'مرّر للاستكشاف' : 'Scroll to explore'}</span>
        <a href={`#${destinations[index]}`} className="dimension-skip">{ar ? 'تخطَّ المشهد' : 'Skip sequence'} <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  )
}
