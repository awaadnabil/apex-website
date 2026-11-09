// The 404 for any URL no route matches. With three root layouts ((legacy), (site), (ar)) there is no
// single layout to compose it from, so Next renders this file on its own (experimental.globalNotFound).
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found · APEX',
  description: 'This page does not exist.',
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className="bg-[#080808]">
      <body className="bg-[#080808] font-sans text-white antialiased">
        <main className="mx-auto flex min-h-svh max-w-xl flex-col justify-center gap-6 px-6">
          <p className="text-sm text-[#00C8C8]">404</p>
          <h1 className="text-4xl font-medium leading-tight">This page isn&apos;t here.</h1>
          <p className="text-white/70" lang="ar" dir="rtl">هذه الصفحة غير موجودة.</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a className="rounded-full bg-[#00C8C8] px-5 py-3 font-medium text-[#080808]" href="/">Go to the APEX home page</a>
            <a className="rounded-full border border-white/25 px-5 py-3 font-medium" href="/ar" lang="ar">الصفحة الرئيسية</a>
          </div>
        </main>
      </body>
    </html>
  )
}
