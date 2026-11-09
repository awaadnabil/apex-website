'use client'

// The concierge form. Same page, same words; the request is now really delivered:
// /api/enquiry -> the enquiry-notify edge function (Turnstile, insert, push to the owner).
// The old random "APX-123456" ticket, the "within the hour" promise and the "copy sent to your inbox"
// line are gone: the reference shown is the saved row's own id, and nothing claims an email was sent.
import { useEffect, useRef, useState } from 'react'

const TOPICS = ['Membership', 'Billing', 'Events & Drives', 'App & Access', 'Something else']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

type Errors = Partial<Record<'name' | 'email' | 'topic' | 'message', string>>

export function SupportContactForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState(false)
  const [reference, setReference] = useState<string | null>(null)
  const startedAt = useRef(0)
  const tsRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)

  useEffect(() => {
    startedAt.current = Date.now()
    if (!SITE_KEY || !tsRef.current) return
    const mount = () => {
      if (!window.turnstile || !tsRef.current || widgetId.current) return
      widgetId.current = window.turnstile.render(tsRef.current, { sitekey: SITE_KEY, theme: 'dark', appearance: 'interaction-only', action: 'concierge' })
    }
    if (window.turnstile) mount()
    else {
      window.onApexTurnstile = mount
      if (!document.querySelector('script[data-apx-turnstile]')) {
        const s = document.createElement('script')
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onApexTurnstile'
        s.async = true
        s.dataset.apxTurnstile = ''
        document.head.append(s)
      }
    }
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const topic = String(fd.get('topic') ?? '').trim()
    const text = String(fd.get('message') ?? '').trim()

    const next: Errors = {}
    if (name.length < 2) next.name = 'Please enter your full name.'
    if (!EMAIL_RE.test(email)) next.email = 'Enter a valid email address.'
    if (!topic) next.topic = 'Select a topic.'
    if (text.length < 12) next.message = 'Tell us a little more (12+ characters).'
    setErrors(next)
    if (Object.keys(next).length) {
      setMessage('Please correct the highlighted fields.')
      ;(form.elements.namedItem(Object.keys(next)[0]) as HTMLElement | null)?.focus()
      return
    }

    setPending(true)
    setMessage('')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          kind: 'concierge',
          locale: 'en',
          name,
          email,
          topic,
          message: text,
          website: String(fd.get('website') ?? ''),
          elapsed_ms: Date.now() - startedAt.current,
          turnstile_token: widgetId.current && window.turnstile ? window.turnstile.getResponse(widgetId.current) ?? '' : '',
        }),
      })
      const out = (await res.json().catch(() => ({}))) as { id?: string; error?: string }
      if (res.ok) {
        setReference(out.id ? `APX-${out.id.replace(/-/g, '').slice(0, 6).toUpperCase()}` : '')
        return
      }
      if (res.status === 429) setMessage('Too many requests from this connection. Try again in ten minutes.')
      else if (out.error?.startsWith('turnstile')) setMessage('The security check did not pass. Complete it again, then send.')
      else if (res.status === 503) setMessage("Requests can't be sent right now. Your message is still here, so try again later.")
      else setMessage("That didn't send. Your message is still here, so try again.")
    } catch {
      setMessage("That didn't send. Your message is still here, so try again.")
    } finally {
      setPending(false)
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current)
    }
  }

  if (reference !== null) {
    return (
      <section id="contact" className="bg-carbon px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center" role="status">
          {reference && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-gold">Reference {reference}</p>
          )}
          <h2 className="mt-6 font-extrabold leading-[0.95] [font-size:clamp(2rem,6vw,3.5rem)]">You&apos;re in the queue.</h2>
          <p className="mt-6 text-[15px] leading-relaxed text-white/60">Received. The concierge desk has your message.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="bg-carbon px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <p className="reveal text-[11px] font-semibold uppercase tracking-[0.5em] text-gold">Concierge</p>
        <h2 className="reveal mt-5 font-extrabold leading-[0.95] [font-size:clamp(2rem,6vw,3.5rem)]">Still need a hand?</h2>
        <p className="reveal mt-6 max-w-lg text-[15px] leading-relaxed text-white/55">
          Send us the details and a member of the concierge desk will respond personally.
        </p>

        <form onSubmit={onSubmit} className="reveal mt-12 flex flex-col gap-8" noValidate>
          <Field id="cf-name" label="Full name" error={errors.name}>
            <input id="cf-name" name="name" type="text" autoComplete="name" placeholder="e.g. Khalid Al Marri" aria-invalid={!!errors.name || undefined} aria-describedby="cf-name-err" className={inputCls} />
          </Field>

          <Field id="cf-email" label="Email" error={errors.email}>
            <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email || undefined} aria-describedby="cf-email-err" className={inputCls} />
          </Field>

          <Field id="cf-topic" label="Topic" error={errors.topic}>
            <select id="cf-topic" name="topic" defaultValue="" aria-invalid={!!errors.topic || undefined} aria-describedby="cf-topic-err" className={`${inputCls} appearance-none`}>
              <option value="" disabled className="bg-carbon">Select a topic</option>
              {TOPICS.map((t) => (
                <option key={t} value={t} className="bg-carbon">{t}</option>
              ))}
            </select>
          </Field>

          <Field id="cf-message" label="Message" error={errors.message}>
            <textarea id="cf-message" name="message" rows={5} placeholder="How can we help?" aria-invalid={!!errors.message || undefined} aria-describedby="cf-message-err" className={`${inputCls} resize-none`} />
          </Field>

          <div className="absolute h-px w-px overflow-hidden [clip-path:inset(50%)]" aria-hidden="true">
            <label htmlFor="cf-website">Leave this empty</label>
            <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div ref={tsRef} />

          <p role="status" className="min-h-[1.25rem] text-[13px] text-gold">{message}</p>

          <button
            type="submit"
            disabled={pending}
            className="group relative mt-2 inline-flex w-full items-center justify-center overflow-hidden bg-white px-9 py-4 text-[9px] font-bold uppercase tracking-[0.4em] text-carbon transition-opacity duration-300 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {pending ? 'Sending…' : 'Send to concierge'}
          </button>
        </form>
      </div>
    </section>
  )
}

const inputCls =
  'w-full border-b border-white/15 bg-transparent py-3 text-base text-white placeholder:text-white/25 transition-colors duration-500 focus:border-gold focus:outline-none'

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">{label}</label>
      {children}
      <span id={`${id}-err`} className="text-[12px] text-gold">{error}</span>
    </div>
  )
}
