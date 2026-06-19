'use client'

const TRIBES = [
  {
    name: 'Supercar',
    desc: 'Hypercars and exotics on the world\u2019s fastest open roads.',
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-supercars-h7OydBomTgS4J9Cz59dYOKCUL8My8z.jpg',
    alt: 'A Bugatti Chiron leading supercars down Sheikh Zayed Road at sunset',
  },
  {
    name: 'Moto',
    desc: 'Superbikes carving the mountain passes at first light.',
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-bikes-s4mRdYk7929ut9Y6Jbo1y1yd5ZD5yf.png',
    alt: 'Superbikes lined up on a desert mountain road',
  },
  {
    name: 'Karting',
    desc: 'Wheel-to-wheel combat where raw talent is measured.',
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-karting.png-qgZtJi8BSrrDZhGJQTWCmBJV5ALJA9.jpeg',
    alt: 'Racing karts mid-corner at Dubai Kartdrome',
  },
  {
    name: 'Offroad',
    desc: 'Built rigs chasing the dunes and the horizon off the tarmac.',
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-offroad-0UjHJtxljRz43vCprimWtwSQ1OXxsY.png',
    alt: 'A lifted rally-style roadster on a sandy lakeshore at sunset',
  },
  {
    name: 'Community',
    desc: 'The meets, the nights, the people who live the machine.',
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-community.png-nsD35voV06hihiEr439JSAK1Zm5SKi.jpeg',
    alt: 'Members gathered around cars at Dubai Marina at night',
  },
]

export function Tribes() {
  return (
    <section className="px-6 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <h2 className="reveal mb-16 text-left font-extrabold leading-none text-white [font-size:clamp(2.5rem,6vw,4rem)]">
          The Tribes
        </h2>

        <div className="flex flex-col gap-3 md:h-[78vh] md:flex-row md:gap-2">
          {TRIBES.map((t, i) => (
            <article
              key={t.name}
              className="group reveal relative h-[300px] cursor-pointer overflow-hidden md:h-full md:flex-1 md:transition-[flex-grow] md:duration-700 md:ease-[cubic-bezier(0.16,1,0.3,1)] md:hover:grow-[2.6]"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img
                src={t.img || '/placeholder.svg'}
                alt={t.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover brightness-[0.4] grayscale-[0.3] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-90 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-carbon/40 transition-opacity duration-700 group-hover:opacity-20" />

              {/* teal edge on hover */}
              <span className="absolute left-0 top-0 h-full w-px scale-y-0 bg-teal transition-transform duration-700 ease-out group-hover:scale-y-100" />

              {/* vertical name (default) -> horizontal on hover, handled via responsive layout */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-extrabold uppercase tracking-[0.2em] text-white [font-size:clamp(1.25rem,2.4vw,1.75rem)] md:[writing-mode:vertical-rl] md:rotate-180 md:self-start md:transition-all md:duration-700 md:group-hover:[writing-mode:horizontal-tb] md:group-hover:rotate-0">
                  {t.name}
                </h3>
                <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-gold opacity-100 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100">
                  {t.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
