'use server'

export type SupportState = {
  status: 'idle' | 'success' | 'error'
  message: string
  errors: Partial<Record<'name' | 'email' | 'topic' | 'message', string>>
  ticketId?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function makeTicketId() {
  const n = Math.floor(100000 + Math.random() * 900000)
  return `APX-${n}`
}

export async function submitSupportRequest(
  _prev: SupportState,
  formData: FormData,
): Promise<SupportState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const topic = String(formData.get('topic') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  const errors: SupportState['errors'] = {}
  if (name.length < 2) errors.name = 'Please enter your full name.'
  if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.'
  if (!topic) errors.topic = 'Select a topic.'
  if (message.length < 12) errors.message = 'Tell us a little more (12+ characters).'

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Please correct the highlighted fields.',
      errors,
    }
  }

  // Simulate dispatching the ticket to the concierge desk.
  await new Promise((r) => setTimeout(r, 700))

  const ticketId = makeTicketId()
  return {
    status: 'success',
    message: `Received. Your concierge will respond within the hour.`,
    errors: {},
    ticketId,
  }
}
