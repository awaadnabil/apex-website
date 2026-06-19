export function Story() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-32 md:px-16">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apex-community.png-nsD35voV06hihiEr439JSAK1Zm5SKi.jpeg"
        alt="APEX members gathered at the Dubai Marina waterfront at night"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-carbon/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/70 to-transparent" />

      <div className="reveal relative z-10 max-w-3xl text-left">
        <h2 className="font-extrabold leading-[0.95] [font-size:clamp(3rem,9vw,6rem)]">
          <span className="block text-white">This is not</span>
          <span className="block text-gold">a social network.</span>
        </h2>

        <p className="mt-12 max-w-xl text-[15px] leading-[1.8] text-white/85">
          APEX is built for the GCC&apos;s most serious drivers and riders. You
          don&apos;t join APEX to scroll. You join to organize, to compete, to
          find your tribe, to push your limits on the best roads in the world.
        </p>
      </div>
    </section>
  )
}
