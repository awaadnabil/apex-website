import { Clubs } from '@/components/drive/clubs'
import { Footer } from '@/components/drive/footer'
import { Hero } from '@/components/drive/hero'
import { Loader } from '@/components/drive/loader'
import { Market } from '@/components/drive/market'
import { Numbers } from '@/components/drive/odometer'
import { SpeedoProgress } from '@/components/drive/speedo-progress'
import { Story } from '@/components/drive/story'
import { TopBar } from '@/components/drive/top-bar'
import { LangProvider } from '@/lib/drive/i18n'

export default function Page() {
  return (
    <LangProvider>
      <Loader />
      <TopBar />
      <main>
        <Hero />
        <Story />
        <Numbers />
        <Clubs />
        <Market />
      </main>
      <Footer />
      <SpeedoProgress />
    </LangProvider>
  )
}
