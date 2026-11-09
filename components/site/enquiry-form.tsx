'use client'

// The partner enquiry form, on the kit's form recipe (system.md, Forms): visible labels, the error under
// each field (aria-invalid + aria-describedby), one status line (role=status), "Sending" after 300ms, the
// sent line only after the server answered 2xx, and every typed value kept on any failure.
// system.js checks the required fields first (it calls preventDefault when one fails); this component then
// sends to /api/enquiry, which forwards to the enquiry-notify edge function. Cloudflare Turnstile runs in
// explicit mode; its token is single-use, so the widget is reset after every attempt.
import { useEffect, useRef, useState } from 'react'
import type { Copy } from '@/lib/site/content'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
      getResponse: (id?: string) => string | undefined
    }
    onApexTurnstile?: () => void
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''
type Field = 'business_name' | 'contact_name' | 'partner_type' | 'city' | 'email' | 'phone'

export function EnquiryForm({ c }: { c: Copy }) {
  const f = c.form
  const formRef = useRef<HTMLFormElement>(null)
  const tsRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const startedAt = useRef<number>(0)
  const statusRef = useRef<HTMLParagraphElement>(null)
  const [busy, setBusy] = useState(false)
  // The status line is shared with system.js (it writes "n to fix" there), so it is written to directly,
  // never through React state: a React-owned text node would be replaced under React's feet.
  const [failed, setFailed] = useState(false)
  const setStatus = (text: string, error = false) => {
    setFailed(error)
    const el = statusRef.current
    if (!el) return
    el.textContent = text
    // a failure is announced at once and shown in the error style; progress and success stay polite
    el.setAttribute('role', error ? 'alert' : 'status')
    el.dataset.state = error ? 'error' : text === f.sent ? 'sent' : ''
  }

  useEffect(() => {
    startedAt.current = Date.now()
    if (!SITE_KEY || !tsRef.current) return
    const mount = () => {
      if (!window.turnstile || !tsRef.current || widgetId.current) return
      widgetId.current = window.turnstile.render(tsRef.current, {
        sitekey: SITE_KEY,
        language: c.locale,
        theme: 'dark',
        appearance: 'interaction-only',
        action: 'partner_enquiry',
      })
    }
    if (window.turnstile) mount()
    else {
      window.onApexTurnstile = mount
      if (!document.querySelector('script[data-apx-turnstile]')) {
        const s = document.createElement('script')
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onApexTurnstile'
        s.async = true
        s.defer = true
        s.dataset.apxTurnstile = ''
        document.head.append(s)
      }
    }
  }, [c.locale])

  function showFieldError(name: Field, text: string) {
    const el = formRef.current?.elements.namedItem(name) as HTMLInputElement | null
    const err = document.getElementById(`pf-${name}-err`)
    if (!el || !err) return
    el.setAttribute('aria-invalid', 'true')
    err.textContent = text
    err.hidden = false
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // system.js has already checked the required fields; when one failed it prevented the submit.
    if (e.defaultPrevented) return
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    const phone = (data.phone ?? '').trim()
    if (phone && !/^[+0-9 ()-]{5,32}$/.test(phone)) {
      showFieldError('phone', f.errors.phone)
      setStatus(f.fix.replace('{n}', '1'), true)
      ;(form.elements.namedItem('phone') as HTMLInputElement).focus()
      return
    }

    const token = widgetId.current && window.turnstile ? window.turnstile.getResponse(widgetId.current) ?? '' : ''
    setBusy(true)
    const wait = window.setTimeout(() => setStatus(f.sending), 300)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          kind: 'partner',
          locale: c.locale,
          business_name: data.business_name,
          contact_name: data.contact_name,
          partner_type: data.partner_type,
          city: data.city,
          email: data.email,
          phone,
          website: data.website ?? '',
          elapsed_ms: Date.now() - startedAt.current,
          turnstile_token: token,
        }),
      })
      window.clearTimeout(wait)
      const out = (await res.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string> }
      if (res.ok) {
        form.reset()
        setStatus(f.sent)
        return
      }
      if (res.status === 422 && out.fields) {
        const names = Object.keys(out.fields) as Field[]
        const map: Record<Field, string> = {
          business_name: f.errors.business,
          contact_name: f.errors.name,
          partner_type: f.errors.type,
          city: f.errors.city,
          email: f.errors.email,
          phone: f.errors.phone,
        }
        names.forEach((n) => showFieldError(n, map[n] ?? f.failed))
        setStatus(f.fix.replace('{n}', String(names.length)), true)
        ;(form.elements.namedItem(names[0]) as HTMLElement | null)?.focus()
        return
      }
      // "tick it again" only makes sense when a Turnstile widget is on the page
      const hasWidget = Boolean(widgetId.current)
      if (res.status === 429) setStatus(f.rate, true)
      else if (hasWidget && (out.error === 'turnstile_failed' || out.error === 'turnstile_missing')) setStatus(f.turnstile, true)
      else if (res.status === 503 || res.status === 403) setStatus(f.unavailable, true)
      else setStatus(f.failed, true)
    } catch {
      window.clearTimeout(wait)
      setStatus(f.failed, true)
    } finally {
      setBusy(false)
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current)
    }
  }

  const L = f.labels
  return (
    <form ref={formRef} className="form apx-form" onSubmit={onSubmit} noValidate data-fix={f.fix} lang={c.locale}>
        <div className="field">
          <label htmlFor="pf-business_name">{L.business}</label>
          <input id="pf-business_name" name="business_name" type="text" autoComplete="organization" required minLength={2} maxLength={160} aria-describedby="pf-business_name-err" />
          <p className="field__error" id="pf-business_name-err" hidden>{f.errors.business}</p>
        </div>
        <div className="field">
          <label htmlFor="pf-contact_name">{L.name}</label>
          <input id="pf-contact_name" name="contact_name" type="text" autoComplete="name" required minLength={2} maxLength={120} aria-describedby="pf-contact_name-err" />
          <p className="field__error" id="pf-contact_name-err" hidden>{f.errors.name}</p>
        </div>
        <div className="field">
          <label htmlFor="pf-partner_type">{L.type}</label>
          <select id="pf-partner_type" name="partner_type" required defaultValue="" aria-describedby="pf-partner_type-err">
            <option value="" disabled>{f.types.choose}</option>
            <option value="dealer">{f.types.dealer}</option>
            <option value="shop">{f.types.shop}</option>
            <option value="ride_stop">{f.types.ride_stop}</option>
          </select>
          <p className="field__error" id="pf-partner_type-err" hidden>{f.errors.type}</p>
        </div>
        <div className="field">
          <label htmlFor="pf-city">{L.city}</label>
          <input id="pf-city" name="city" type="text" autoComplete="address-level2" required minLength={2} maxLength={80} aria-describedby="pf-city-err" />
          <p className="field__error" id="pf-city-err" hidden>{f.errors.city}</p>
        </div>
        <div className="field">
          <label htmlFor="pf-email">{L.email}</label>
          <input id="pf-email" name="email" type="email" inputMode="email" autoComplete="email" dir="ltr" required maxLength={254} aria-describedby="pf-email-err" />
          <p className="field__error" id="pf-email-err" hidden>{f.errors.email}</p>
        </div>
        <div className="field">
          <label htmlFor="pf-phone">{L.phone} <span className="muted">({L.optional})</span></label>
          <input id="pf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" maxLength={32} aria-describedby="pf-phone-err" />
          <p className="field__error" id="pf-phone-err" hidden>{f.errors.phone}</p>
        </div>
      {/* honeypot: people never see or reach it; bots that fill it are dropped server-side */}
      <div className="apx-hp" aria-hidden="true">
        <label htmlFor="pf-website">{f.honeypot}</label>
        <input id="pf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div ref={tsRef} className="apx-turnstile" />
      <div className="btn-row"><button className="btn btn--primary" type="submit" disabled={busy} aria-busy={busy || undefined}>{f.button}</button></div>
      <p ref={statusRef} className="form__status" role="status" data-form-status />
      {failed && (
        <p className="apx-form__fallback">
          <a className="link" href="/concierge" hrefLang="en">{f.fallback}</a>
        </p>
      )}
    </form>
  )
}
