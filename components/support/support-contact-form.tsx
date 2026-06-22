'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitSupportRequest, type SupportState } from '@/app/support/actions'

const initialState: SupportState = { status: 'idle', message: '', errors: {} }

const TOPICS = ['Membership', 'Billing', 'Events & Drives', 'App & Access', 'Something else']

export function SupportContactForm() {
  const [state, formAction] = useActionState(submitSupportRequest, initialState)

  if (state.status === 'success') {
    return (
      <section id="contact" className="bg-carbon px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-gold">
            Ticket {state.ticketId}
          </p>
          <h2 className="mt-6 font-extrabold leading-[0.95] [font-size:clamp(2rem,6vw,3.5rem)]">
            You&apos;re in the queue.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-white/60">{state.message}</p>
          <p className="mt-2 text-[13px] text-white/40">
            A copy has been sent to your inbox for your records.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="bg-carbon px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <p className="reveal text-[11px] font-semibold uppercase tracking-[0.5em] text-gold">
          Concierge
        </p>
        <h2 className="reveal mt-5 font-extrabold leading-[0.95] [font-size:clamp(2rem,6vw,3.5rem)]">
          Still need a hand?
        </h2>
        <p className="reveal mt-6 max-w-lg text-[15px] leading-relaxed text-white/55">
          Send us the details and a member of the concierge desk will respond personally.
        </p>

        <form action={formAction} className="reveal mt-12 flex flex-col gap-8" noValidate>
          <Field label="Full name" error={state.errors.name}>
            <input
              name="name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Khalid Al Marri"
              className={inputCls}
            />
          </Field>

          <Field label="Email" error={state.errors.email}>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={inputCls}
            />
          </Field>

          <Field label="Topic" error={state.errors.topic}>
            <select name="topic" defaultValue="" className={`${inputCls} appearance-none`}>
              <option value="" disabled className="bg-carbon">
                Select a topic
              </option>
              {TOPICS.map((t) => (
                <option key={t} value={t} className="bg-carbon">
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Message" error={state.errors.message}>
            <textarea
              name="message"
              rows={5}
              placeholder="How can we help?"
              className={`${inputCls} resize-none`}
            />
          </Field>

          {state.status === 'error' && state.message && (
            <p role="alert" className="text-[13px] text-gold">
              {state.message}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </section>
  )
}

const inputCls =
  'w-full border-b border-white/15 bg-transparent py-3 text-base text-white placeholder:text-white/25 transition-colors duration-500 focus:border-gold focus:outline-none'

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
        {label}
      </span>
      {children}
      {error && <span className="text-[12px] text-gold">{error}</span>}
    </label>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative mt-2 inline-flex w-full items-center justify-center overflow-hidden bg-white px-9 py-4 text-[9px] font-bold uppercase tracking-[0.4em] text-carbon transition-opacity duration-300 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? 'Sending…' : 'Send to concierge'}
    </button>
  )
}
