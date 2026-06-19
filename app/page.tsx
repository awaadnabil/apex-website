import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'APEX — GCC\'s Premier Motor Community',
  description: 'The most exclusive motor community in the GCC. Drives. Tribes. Routes. By invitation. By passion. By machine.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-white font-sans">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
        <div className="relative z-20 flex flex-col items-center gap-6">
          <p className="text-[#C9A84C] text-xs tracking-[0.6em] uppercase">Statement of exclusivity</p>
          <h1 className="text-[clamp(5rem,20vw,14rem)] font-black leading-none tracking-tight text-white">APEX</h1>
          <div className="w-20 h-px bg-[#C9A84C]" />
          <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase">GCC&apos;s Premier Motor Community</p>
          <p className="text-white/60 text-sm italic">By invitation. By passion. By machine.</p>
          <div className="flex gap-4 mt-4">
            <a href="https://apps.apple.com" className="px-8 py-3 bg-[#00C8C8] text-black text-xs font-bold tracking-[0.3em] uppercase hover:bg-[#00C8C8]/80 transition-colors">
              DOWNLOAD IOS
            </a>
            <a href="https://instagram.com/getapexmena" className="px-8 py-3 border border-[#C9A84C] text-[#C9A84C] text-xs font-bold tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-colors">
              FOLLOW US
            </a>
          </div>
          <p className="text-[#00C8C8] text-xs tracking-[0.4em] uppercase mt-2 animate-pulse">COMING SOON</p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 px-6 text-center">
          {[
            { number: '7', label: 'Cities' },
            { number: '4', label: 'Tribes' },
            { number: '350+', label: 'Routes' },
            { number: '1', label: 'Community' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-[#C9A84C] text-5xl font-black">{stat.number}</p>
              <p className="text-white/50 text-xs tracking-[0.3em] uppercase mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRIBES */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-16 text-white">THE TRIBES</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'SUPERCAR', emoji: '🏎️' },
              { name: 'MOTO', emoji: '🏍️' },
              { name: 'OFFROAD', emoji: '🏔️' },
              { name: 'SPORT', emoji: '🏁' },
              { name: 'KARTING', emoji: '🎯' },
            ].map((tribe) => (
              <div key={tribe.name} className="border border-white/10 p-8 flex flex-col items-center gap-4 hover:border-[#00C8C8] transition-colors group">
                <span className="text-4xl">{tribe.emoji}</span>
                <p className="text-xs font-bold tracking-[0.3em] text-white/60 group-hover:text-[#00C8C8] transition-colors">{tribe.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-16 text-center text-white">CHOOSE YOUR ACCESS</h2>
          <div className="flex flex-col gap-4">
            {[
              { name: 'IGNITE', price: 'AED 49.99/mo', border: 'border-[#00C8C8]', features: ['Create unlimited drives', 'Join request-only drives', 'Pro badge', 'MEMBER tier unlocked'] },
              { name: 'CARBON', price: 'AED 149.99/mo', border: 'border-[#C9A84C]', badge: 'RECOMMENDED', features: ['Everything in IGNITE', 'Animated gold badge', 'Verified profile', 'Featured organizer'] },
              { name: 'OBSIDIAN', price: 'By invitation only', border: 'border-white/20', features: ['Everything in CARBON', '████████████', '████████████', '████████████'] },
            ].map((tier) => (
              <div key={tier.name} className={`border-l-2 ${tier.border} bg-white/5 p-8 flex flex-col md:flex-row md:items-center gap-6`}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-xl font-black text-white">{tier.name}</p>
                    {tier.badge && <span className="text-[8px] bg-[#C9A84C] text-black px-2 py-1 font-bold tracking-widest">{tier.badge}</span>}
                  </div>
                  <p className="text-[#C9A84C] text-sm">{tier.price}</p>
                </div>
                <div className="flex-2 grid grid-cols-2 gap-2">
                  {tier.features.map((f) => (
                    <p key={f} className="text-white/40 text-xs">{f}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 px-6 border-t border-white/10 text-center">
        <h2 className="text-5xl md:text-8xl font-black text-white leading-none mb-4">THIS IS NOT<br /><span className="text-[#C9A84C]">FOR EVERYONE.</span></h2>
        <p className="text-white/40 text-xs tracking-[0.5em] uppercase mt-8 mb-12">You already know if you belong.</p>
        <div className="flex gap-4 justify-center">
          <a href="https://apps.apple.com" className="px-8 py-3 bg-[#00C8C8] text-black text-xs font-bold tracking-[0.3em] uppercase">DOWNLOAD IOS</a>
          <a href="https://instagram.com/getapexmena" className="px-8 py-3 border border-[#C9A84C] text-[#C9A84C] text-xs font-bold tracking-[0.3em] uppercase">FOLLOW US</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10 text-center">
        <p className="text-white/20 text-xs">support@getapexmena.com · © 2026 APEX</p>
      </footer>
    </main>
  )
}
