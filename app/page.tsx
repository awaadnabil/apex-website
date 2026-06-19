import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "APEX — GCC's Premier Motor Community",
  description: 'The most exclusive motor community in the GCC.',
}

const IMG = {
  hero:      'https://d8j0ntlcm91z4.cloudfront.net/user_3FLa4kgr567GaHos7YYoxPHwglb/hf_20260619_102527_745ad5ec-0218-4b68-afba-57de90d30193.png',
  supercars: 'https://d8j0ntlcm91z4.cloudfront.net/user_3FLa4kgr567GaHos7YYoxPHwglb/hf_20260619_093459_f5b0056e-f8bb-4324-90f5-8dc5cb89a1f4.png',
  bikes:     'https://d8j0ntlcm91z4.cloudfront.net/user_3FLa4kgr567GaHos7YYoxPHwglb/hf_20260619_093415_b8d5343a-3a7b-49a0-9522-a1578be68fb3.png',
  offroad:   'https://d8j0ntlcm91z4.cloudfront.net/user_3FLa4kgr567GaHos7YYoxPHwglb/hf_20260619_091454_2680bdf5-1ade-4fcf-b72d-dc964c6e911f.png',
  karting:   'https://d8j0ntlcm91z4.cloudfront.net/user_3FLa4kgr567GaHos7YYoxPHwglb/hf_20260619_091349_cba774ff-4435-4a69-ade9-195ea0d27a94.png',
  sport:     'https://d8j0ntlcm91z4.cloudfront.net/user_3FLa4kgr567GaHos7YYoxPHwglb/hf_20260619_090254_d24f617d-482e-442e-a745-2ce7d31fc097.png',
  community: 'https://d8j0ntlcm91z4.cloudfront.net/user_3FLa4kgr567GaHos7YYoxPHwglb/hf_20260619_090249_dcbd5e42-4cca-4bf0-b975-73ec13237cd8.png',
}

const TRIBES = [
  { name: 'SUPERCAR', img: IMG.supercars },
  { name: 'MOTO',     img: IMG.bikes     },
  { name: 'KARTING',  img: IMG.karting   },
  { name: 'OFFROAD',  img: IMG.offroad   },
  { name: 'SPORT',    img: IMG.sport     },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-white overflow-x-hidden" style={{fontFamily:'var(--font-syne),sans-serif'}}>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        <span className="text-white font-extrabold text-base tracking-widest">APEX</span>
        <a href="https://apps.apple.com" className="text-[10px] tracking-[0.35em] uppercase text-white/50 hover:text-white transition-colors duration-300">Download iOS</a>
      </nav>

      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url(${IMG.hero})`}} />
        <div className="absolute inset-0 bg-[#080808]/50" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#080808] to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white font-extrabold leading-none select-none text-center" style={{fontSize:'clamp(7rem,23vw,22rem)',letterSpacing:'-0.02em'}}>APEX</h1>
          <div className="flex flex-col items-center gap-3 mt-6">
            <div className="w-12 h-px bg-[#C9A84C]" />
            <p className="text-[10px] tracking-[0.55em] uppercase text-white/60">GCC&apos;s Premier Motor Community</p>
            <p className="text-white/35 text-sm italic tracking-wide">By invitation. By passion. By machine.</p>
          </div>
          <div className="flex items-center gap-4 mt-10">
            <a href="https://apps.apple.com" className="px-9 py-3.5 border border-white text-white text-[10px] font-bold tracking-[0.35em] uppercase hover:bg-white hover:text-black transition-all duration-300">DOWNLOAD IOS</a>
            <a href="https://instagram.com/getapexmena" className="px-9 py-3.5 border border-[#C9A84C]/60 text-[#C9A84C] text-[10px] font-bold tracking-[0.35em] uppercase hover:border-[#C9A84C] transition-all duration-300">REQUEST ACCESS</a>
          </div>
          <div className="absolute bottom-10 flex flex-col items-center gap-2">
            <div className="w-px h-8 bg-white/20" />
          </div>
        </div>
      </section>

      <section className="py-28 border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {[{n:'350+',l:'ROUTES'},{n:'7',l:'CITIES'},{n:'5',l:'TRIBES'},{n:'1',l:'COMMUNITY'}].map((s,i) => (
            <div key={s.l} className={`flex flex-col items-start px-12 py-6${i<3?' md:border-r border-white/[0.07]':''}`}>
              <p className="font-extrabold leading-none text-[#C9A84C]" style={{fontSize:'clamp(3.5rem,8vw,7rem)'}}>{s.n}</p>
              <p className="text-[9px] tracking-[0.5em] uppercase text-white/30 mt-3">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="px-10 mb-10">
          <h2 className="font-extrabold text-white leading-none" style={{fontSize:'clamp(3rem,9vw,8rem)'}}>The Tribes</h2>
        </div>
        <div className="flex w-full" style={{height:'70vh'}}>
          {TRIBES.map((t) => (
            <div key={t.name} className="relative flex-1 overflow-hidden group cursor-pointer">
              <img src={t.img} alt={t.name} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-[#080808]/40 group-hover:bg-[#080808]/20 transition-all duration-700" />
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <p className="font-extrabold text-white select-none" style={{fontSize:'clamp(0.65rem,1.4vw,1rem)',writingMode:'vertical-rl',textOrientation:'mixed',transform:'rotate(180deg)',letterSpacing:'0.25em'}}>{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden" style={{height:'50vh'}}>
        <img src={IMG.community} alt="APEX Community" className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <p className="text-[9px] tracking-[0.7em] uppercase text-white/30 mb-5">One platform. Every machine.</p>
            <h2 className="font-extrabold text-white leading-none" style={{fontSize:'clamp(2.5rem,7vw,6rem)'}}>THE GCC DRIVES<br /><span className="text-[#C9A84C]">TOGETHER.</span></h2>
          </div>
        </div>
      </section>

      <section className="py-32 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-10">
          <h2 className="font-extrabold text-white leading-none mb-20" style={{fontSize:'clamp(3rem,9vw,8rem)'}}>Your Access</h2>
          <div className="flex flex-col divide-y divide-white/[0.07]">

            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 py-14">
              <div className="md:w-48 flex-shrink-0">
                <p className="text-[9px] tracking-[0.5em] uppercase text-[#00C8C8] mb-2">01</p>
                <p className="font-extrabold text-white text-2xl">IGNITE</p>
                <p className="text-[#C9A84C] text-sm mt-2">AED 49.99 / mo</p>
              </div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-3">
                {['Create unlimited drives','Join request-only drives','Pro member badge','Tribe chat access','Route library — 350+ routes','APEX Perks discounts'].map(f => (
                  <p key={f} className="text-white/35 text-xs tracking-wide">{f}</p>
                ))}
              </div>
              <a href="https://apps.apple.com" className="flex-shrink-0 md:self-center px-8 py-3 border border-white/20 text-white/50 text-[10px] tracking-[0.3em] uppercase hover:border-white hover:text-white transition-all duration-300">GET IGNITE</a>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 py-14">
              <div className="md:w-48 flex-shrink-0">
                <p className="text-[9px] tracking-[0.5em] uppercase text-[#C9A84C] mb-2">02</p>
                <p className="font-extrabold text-white text-2xl">CARBON</p>
                <p className="text-[#C9A84C] text-sm mt-2">AED 149.99 / mo</p>
                <span className="inline-block mt-3 text-[8px] tracking-[0.3em] bg-[#C9A84C] text-black px-2 py-1 uppercase font-bold">Recommended</span>
              </div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-3">
                {['Everything in IGNITE','Animated gold badge','Verified profile','Featured drive organizer','Priority group requests','Early access features'].map(f => (
                  <p key={f} className="text-white/35 text-xs tracking-wide">{f}</p>
                ))}
              </div>
              <a href="https://apps.apple.com" className="flex-shrink-0 md:self-center px-8 py-3 bg-[#C9A84C] text-black text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-white transition-all duration-300">GET CARBON</a>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 py-14 opacity-60">
              <div className="md:w-48 flex-shrink-0">
                <p className="text-[9px] tracking-[0.5em] uppercase text-white/30 mb-2">03</p>
                <p className="font-extrabold text-white text-2xl">OBSIDIAN</p>
                <p className="text-white/30 text-sm mt-2">By invitation only</p>
              </div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-3">
                {['Everything in CARBON','████████████████','████████████████','████████████████','████████████████','████████████████'].map((f,i) => (
                  <p key={i} className={`text-xs tracking-wide ${i===0?'text-white/35':'text-white/10'}`}>{f}</p>
                ))}
              </div>
              <div className="flex-shrink-0 md:self-center px-8 py-3 border border-white/10 text-white/20 text-[10px] tracking-[0.3em] uppercase cursor-not-allowed">INVITATION ONLY</div>
            </div>

          </div>
        </div>
      </section>

      <section className="relative py-52 overflow-hidden border-t border-white/[0.06]">
        <img src={IMG.supercars} alt="APEX" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#080808]/60 to-[#080808]" />
        <div className="relative z-10 text-center px-6">
          <h2 className="font-extrabold text-white leading-none" style={{fontSize:'clamp(3.5rem,12vw,11rem)'}}>THIS IS NOT<br /><span className="text-[#C9A84C]">FOR EVERYONE.</span></h2>
          <p className="text-[9px] tracking-[0.8em] uppercase text-white/25 mt-10 mb-14">You already know if you belong.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://apps.apple.com" className="px-12 py-4 border border-white text-white text-[10px] font-bold tracking-[0.35em] uppercase hover:bg-white hover:text-black transition-all duration-300">DOWNLOAD IOS</a>
            <a href="https://instagram.com/getapexmena" className="px-12 py-4 border border-[#C9A84C]/50 text-[#C9A84C] text-[10px] font-bold tracking-[0.35em] uppercase hover:border-[#C9A84C] transition-all duration-300">FOLLOW US</a>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-extrabold text-white/60 text-sm tracking-widest">APEX</span>
          <div className="flex items-center gap-8">
            <a href="/privacy" className="text-[9px] tracking-[0.35em] uppercase text-white/20 hover:text-white/50 transition-colors">Privacy</a>
            <a href="https://instagram.com/getapexmena" className="text-[9px] tracking-[0.35em] uppercase text-white/20 hover:text-white/50 transition-colors">Instagram</a>
            <a href="mailto:support@getapexmena.com" className="text-[9px] tracking-[0.35em] uppercase text-white/20 hover:text-white/50 transition-colors">Contact</a>
          </div>
          <p className="text-[9px] text-white/10 tracking-widest">© 2026 APEX</p>
        </div>
      </footer>

    </main>
  )
}
