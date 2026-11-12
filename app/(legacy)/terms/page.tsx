import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Terms of Use — APEX",
  description: "APEX Terms of Use",
  alternates: { canonical: "https://getapexmena.com/terms", languages: { en: "https://getapexmena.com/terms", ar: "https://getapexmena.com/ar/terms" } },
}

export default function Terms() {
  return (
    <main className="min-h-screen bg-[#080808] text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="text-[#00C8C8] text-xs tracking-[0.3em] uppercase mb-12 block">← APEX</a>
        <h1 className="text-4xl font-black mb-2">Terms of Use</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: November 2026</p>
        <div className="space-y-10 text-white/70 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-lg mb-3">1. Acceptance of Terms</h2>
            <p>By downloading or using APEX, you agree to these Terms of Use. If you do not agree, do not use the app.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">2. Use of the App</h2>
            <p>APEX is a motor community for GCC enthusiasts. You must be 18 or older. You agree to use the app lawfully and respectfully.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">3. Subscriptions and Payments</h2>
            <p>APEX offers auto-renewable subscriptions. On iPhone, subscriptions are purchased through the App Store and processed by Apple In-App Purchase; they renew unless cancelled 24 hours before the end of the current period, and you manage them in Settings → Apple ID → Subscriptions. On Android and the web, subscriptions are processed by Paddle.com, as set out in section 8.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">4. User Content</h2>
            <p>You retain ownership of content you post. By posting you grant APEX a license to display that content in the app.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">5. Community Standards</h2>
            <p>Harassment, spam, or illegal content is prohibited and may result in immediate account termination.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">6. Disclaimer</h2>
            <p>APEX organises community drives for informational purposes only. We are not responsible for any accidents or damages during drives. Always drive safely and within local traffic laws.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">7. Termination</h2>
            <p>We may suspend or terminate your account for violations. You may delete your account anytime from app settings.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">8. Web and Android Orders</h2>
            <p>Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our web and Android orders. Paddle provides all customer service inquiries and handles returns.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">9. Contact</h2>
            <p className="mt-3 text-[#00C8C8]">support@getapexmena.com</p>
            <p className="mt-1 text-white/40">APEX Motors GCC · Dubai, United Arab Emirates</p>
          </section>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
