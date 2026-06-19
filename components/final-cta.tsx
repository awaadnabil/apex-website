import { ApexButton } from './apex-button'

export function FinalCta() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-carbon px-6 text-center">
      <h2 className="reveal text-balance font-extrabold leading-[0.92] [font-size:clamp(2.5rem,12vw,8rem)]">
        <span className="block text-white">This is not</span>
        <span className="block text-gold">for everyone.</span>
      </h2>

      <p className="reveal mt-16 text-[14px] uppercase tracking-[0.5em] text-white/80">
        You already know if you belong.
      </p>

      <div className="reveal mt-16 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <ApexButton href="#top" variant="white">
          Download iOS
        </ApexButton>
        <ApexButton href="#membership" variant="gold">
          Request Access
        </ApexButton>
      </div>
    </section>
  )
}
