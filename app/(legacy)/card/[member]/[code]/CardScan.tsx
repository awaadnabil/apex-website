'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  fetchScanVenues,
  perkToGive,
  scanApexCard,
  scanHeadline,
  type CardScanResult,
  type ScanVenue,
} from '@/lib/card-scan'

/** The venue this browser said it is — the staff pick it once. */
const VENUE_KEY = 'apex_card_scan_venue'

function readVenue(): ScanVenue | null {
  try {
    const raw = window.localStorage.getItem(VENUE_KEY)
    const v = raw ? (JSON.parse(raw) as ScanVenue) : null
    return v && typeof v.id === 'string' && typeof v.name === 'string' ? v : null
  } catch {
    return null
  }
}

function saveVenue(v: ScanVenue) {
  try {
    window.localStorage.setItem(VENUE_KEY, JSON.stringify(v))
  } catch {
    /* private mode: this scan still uses it */
  }
}

function fmtTime(iso: string | undefined): string {
  const d = iso ? new Date(iso) : null
  return d && !Number.isNaN(d.getTime())
    ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : ''
}

export function CardScan({ member, code }: { member: string | null; code: string | null }) {
  const [venue, setVenue] = useState<ScanVenue | null>(null)
  const [venueReady, setVenueReady] = useState(false)
  const [result, setResult] = useState<CardScanResult | null>(null)
  const [failed, setFailed] = useState(false)
  const [busy, setBusy] = useState(false)
  const [picking, setPicking] = useState(false)
  const [venues, setVenues] = useState<ScanVenue[] | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setVenue(readVenue())
    setVenueReady(true)
  }, [])

  const scan = useCallback(async () => {
    if (!member || !code) return
    setBusy(true)
    try {
      setResult(await scanApexCard({ member, code }, venue?.id ?? null))
      setFailed(false)
    } catch {
      setFailed(true)
    } finally {
      setBusy(false)
    }
  }, [member, code, venue?.id])

  useEffect(() => {
    if (venueReady) void scan()
  }, [venueReady, scan])

  const openPicker = () => {
    setPicking(true)
    if (!venues) void fetchScanVenues().then(setVenues)
  }

  const choose = (v: ScanVenue) => {
    saveVenue(v)
    setVenue(v)
    setPicking(false)
    setQuery('')
  }

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = venues ?? []
    return (q ? list.filter((v) => `${v.name} ${v.city ?? ''}`.toLowerCase().includes(q)) : list).slice(0, 30)
  }, [venues, query])

  if (!member || !code) {
    return <Status ok={false} title="Not an APEX Card" body="This link is incomplete. Ask the rider to open their APEX Card and scan the live QR." />
  }

  const head = failed
    ? { ok: false, title: 'Couldn’t check the card', body: 'Check your connection and try again.' }
    : scanHeadline(result)
  const valid = !!result?.valid && !result.own_card
  const perk = perkToGive(result)
  const isMember = result?.tier === 'member'

  return (
    <>
      <Status ok={head.ok} title={head.title} body={head.body} loading={busy && !result && !failed}>
        {valid ? (
          <>
            {result?.rider_name ? <p className="text-xl font-bold">{result.rider_name}</p> : null}
            <span
              className={
                isMember
                  ? 'rounded-full bg-teal px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-carbon'
                  : 'rounded-full border border-white/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white'
              }
            >
              {isMember ? 'APEX Member' : 'Rider'}
            </span>
          </>
        ) : null}
        {result?.scanned_at ? (
          <p className="text-[12px] text-white/50">{`Checked ${fmtTime(result.scanned_at)}${result.scan_id ? ' · recorded' : ''}`}</p>
        ) : null}
      </Status>

      {valid && perk ? (
        <div className="flex flex-col gap-2 rounded-2xl border border-teal/40 bg-teal/10 p-5 text-center" aria-live="polite">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">Give this perk</p>
          <p className="text-balance text-2xl font-extrabold leading-tight">{perk}</p>
          {!isMember && result?.dealer?.member_perk ? (
            <p className="text-[13px] text-white/60">{`APEX Members only (not this rider): ${result.dealer.member_perk}`}</p>
          ) : null}
          {result?.recently_redeemed ? (
            <p className="text-[13px] font-bold text-[#FFB020]">Already redeemed here in the last 10 minutes.</p>
          ) : null}
        </div>
      ) : null}

      {valid && venue && !picking ? (
        <div className="flex items-center gap-3 text-[15px]">
          <span className="min-w-0 flex-1 truncate font-semibold">{`${venue.name} · this device`}</span>
          <button type="button" onClick={openPicker} className="min-h-11 px-2 font-bold text-teal">
            Change
          </button>
        </div>
      ) : null}

      {valid && !venue && !picking ? (
        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-[17px] font-bold">Which venue are you?</p>
          <p className="text-[13px] text-white/60">
            Pick it once. This browser remembers it and shows the right perk for every scan.
          </p>
          <button
            type="button"
            onClick={openPicker}
            className="min-h-12 rounded-xl bg-white text-[13px] font-bold uppercase tracking-[0.2em] text-carbon"
          >
            Choose your venue
          </button>
        </div>
      ) : null}

      {picking ? (
        <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search venue or city"
            aria-label="Search venue"
            autoFocus
            className="min-h-11 rounded-xl bg-white/10 px-3 text-[16px] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal"
          />
          {venues === null ? <p className="py-2 text-[13px] text-white/50">Loading partners…</p> : null}
          {venues && shown.length === 0 ? <p className="py-2 text-[13px] text-white/50">No partner found.</p> : null}
          <ul className="flex flex-col">
            {shown.map((v) => (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => choose(v)}
                  className="flex min-h-12 w-full flex-col items-start justify-center py-1 text-left"
                >
                  <span className="text-[15px] font-semibold">{v.name}</span>
                  {v.city ? <span className="text-[12px] text-white/50">{v.city}</span> : null}
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => setPicking(false)} className="min-h-11 text-[13px] font-bold text-white/60">
            Cancel
          </button>
        </div>
      ) : null}

      {valid && venue ? (
        <p className="text-[13px] leading-relaxed text-white/60">
          This scan is recorded for the venue. To record the bill, staff open the APEX app → Partner console → Redeem.
        </p>
      ) : null}

      {(!head.ok && result) || failed ? (
        <button
          type="button"
          onClick={() => void scan()}
          disabled={busy}
          className="min-h-12 rounded-xl border border-white/40 text-[13px] font-bold uppercase tracking-[0.2em] disabled:opacity-50"
        >
          {busy ? 'Checking…' : 'Check again'}
        </button>
      ) : null}
    </>
  )
}

function Status({
  ok,
  title,
  body,
  loading,
  children,
}: {
  ok: boolean
  title: string
  body: string | null
  loading?: boolean
  children?: React.ReactNode
}) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center gap-3 rounded-2xl border bg-white/5 p-6 text-center ${ok ? 'border-teal/50' : 'border-white/10'}`}
    >
      {loading ? (
        <span aria-hidden="true" className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      ) : (
        <span
          aria-hidden="true"
          className={`flex h-14 w-14 items-center justify-center rounded-full text-3xl font-black ${ok ? 'bg-teal text-carbon' : 'bg-[#FF4D4D] text-white'}`}
        >
          {ok ? '✓' : '✕'}
        </span>
      )}
      <h1 className="text-[26px] font-extrabold leading-tight">{title}</h1>
      {body ? <p className="text-[14px] leading-relaxed text-white/60">{body}</p> : null}
      {children}
    </div>
  )
}
