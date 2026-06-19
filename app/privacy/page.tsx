import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — APEX',
  description: 'APEX Privacy Policy',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#080808] text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="text-[#00C8C8] text-xs tracking-[0.3em] uppercase mb-12 block">← APEX</a>
        <h1 className="text-4xl font-black mb-2">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: June 2026</p>

        <div className="space-y-10 text-white/70 text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-bold text-lg mb-3">1. Introduction</h2>
            <p>APEX ("we", "our", or "us") operates the APEX mobile application (the "App"). This Privacy Policy explains how we collect, use, and protect your information when you use our App. By using APEX, you agree to the collection and use of information in accordance with this policy.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect the following types of information:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong className="text-white">Account Information:</strong> Name, email address, and profile photo when you create an account.</li>
              <li><strong className="text-white">Vehicle Information:</strong> Vehicle details you choose to add to your profile.</li>
              <li><strong className="text-white">Location Data:</strong> With your permission, we collect location data to show drives and routes near you. Location sharing during drives is optional and opt-in only.</li>
              <li><strong className="text-white">Usage Data:</strong> Information about how you use the App, including drives attended, routes viewed, and community interactions.</li>
              <li><strong className="text-white">Device Information:</strong> Device type, operating system, and push notification token for sending notifications.</li>
              <li><strong className="text-white">Payment Information:</strong> Subscription purchases are processed by Apple in-app purchases. We do not store your payment card details.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">3. How We Use Your Information</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>To provide and operate the APEX App and its features</li>
              <li>To send push notifications about drives, community activity, and achievements</li>
              <li>To process membership subscriptions through Apple in-app purchases</li>
              <li>To improve and personalize your experience</li>
              <li>To communicate with you about updates and support</li>
              <li>To ensure the safety and security of our community</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">4. Data Sharing</h2>
            <p className="mb-3">We do not sell your personal data. We share data only in the following circumstances:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong className="text-white">Community Members:</strong> Your profile, vehicles, and drive activity are visible to other APEX members as part of the community experience.</li>
              <li><strong className="text-white">Service Providers:</strong> We use Supabase for database and authentication services, operating under strict data protection agreements.</li>
              <li><strong className="text-white">Legal Requirements:</strong> We may disclose information if required by law or to protect the rights and safety of APEX and its users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">5. Data Retention</h2>
            <p>We retain your data for as long as your account is active. You may delete your account at any time from the App settings, which will permanently remove your personal data from our systems within 30 days.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">6. Security</h2>
            <p>We implement industry-standard security measures to protect your data, including encrypted data transmission, secure authentication, and row-level security on our database. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">7. Children's Privacy</h2>
            <p>APEX is not intended for users under the age of 18. We do not knowingly collect personal information from children under 18. If you believe a child has provided us with personal information, please contact us immediately.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">8. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate personal data</li>
              <li>Delete your account and personal data</li>
              <li>Opt out of push notifications at any time through your device settings</li>
              <li>Withdraw consent for location sharing at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes through the App or via email. Continued use of the App after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or your personal data, please contact us at:</p>
            <p className="mt-3 text-[#00C8C8]">support@getapexmena.com</p>
            <p className="mt-1 text-white/40">APEX Motors GCC<br />Dubai, United Arab Emirates</p>
          </section>

        </div>
      </div>
    </main>
  )
}
