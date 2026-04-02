"use client"

import { Search, X, Check, Star, Bell } from "lucide-react"
import { useState } from "react"

// ─── Shared overlay ───────────────────────────────────────────────

function Overlay({
  onClose,
  children,
}: {
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {children}
    </div>
  )
}

// ─── Modal shell ──────────────────────────────────────────────────

function Modal({
  onClose,
  children,
  width = "w-[420px]",
}: {
  onClose: () => void
  children: React.ReactNode
  width?: string
}) {
  return (
    <div
      className={`relative ${width} max-w-[92vw] rounded-2xl bg-[#111820] border border-[rgba(0,200,220,0.20)] p-7`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 w-7 h-7 rounded-md bg-[#16202b] border border-[rgba(0,200,220,0.12)] flex items-center justify-center text-[#7a9ab5] hover:text-[#e4eef5] transition-colors"
      >
        <X size={13} />
      </button>
      {children}
    </div>
  )
}

// ─── Pro modal ────────────────────────────────────────────────────

const PRO_FEATURES = [
  "Multilingual transcription (50+ languages)",
  "Export summaries as PDF",
  "50 meeting uploads / day (vs 3 on Free)",
  "Priority AI processing queue",
  "Advanced action-item extraction",
]

function formatCardNumber(raw: string): string {
  return raw
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim()
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4)
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)} / ${digits.slice(2)}`
  }
  return digits
}

function ProModal({ onClose }: { onClose: () => void }) {
  const [cardName, setCardName] = useState("")
  const [cardNum,  setCardNum]  = useState("")
  const [expiry,   setExpiry]   = useState("")
  const [cvv,      setCvv]      = useState("")
  const [errors,   setErrors]   = useState<Record<string, boolean>>({})
  const [success,  setSuccess]  = useState(false)

  function inputClass(field: string) {
    const hasError = errors[field] === true
    return [
      "w-full bg-[#16202b] rounded-lg px-3 py-2.5 text-[13px] text-[#e4eef5] outline-none",
      "placeholder:text-[#3f5f78] transition-all border",
      hasError
        ? "border-[rgba(220,60,60,0.60)] focus:border-[rgba(220,60,60,0.80)]"
        : "border-[rgba(0,200,220,0.18)] focus:border-[#00c8d8] focus:shadow-[0_0_0_3px_rgba(0,200,220,0.10)]",
    ].join(" ")
  }

  function handleSubmit() {
    const next: Record<string, boolean> = {}
    if (!cardName.trim())                        next.cardName = true
    if (cardNum.replace(/\s/g, "").length < 16) next.cardNum  = true
    if (expiry.replace(/[\s/]/g, "").length < 4) next.expiry  = true
    if (cvv.length < 3)                          next.cvv     = true
    setErrors(next)
    if (Object.keys(next).length === 0) setSuccess(true)
  }

  if (success) {
    return (
      <Modal onClose={onClose} width="w-[400px]">
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-14 h-14 rounded-full bg-[rgba(0,200,160,0.15)] border border-[rgba(0,200,160,0.30)] flex items-center justify-center mb-4">
            <Check size={26} className="text-[#00c8a0]" />
          </div>
          <h2 className="text-[20px] font-semibold text-[#e4eef5] mb-2">
            You&apos;re Pro now!
          </h2>
          <p className="text-[13px] text-[#7a9ab5] leading-relaxed mb-6 max-w-[280px]">
            Multilingual transcription, PDF export and 50 uploads/day are now active on your account.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#00c8d8] text-[14px] font-semibold text-[#0a0f14] hover:bg-[#00e8ff] transition-colors"
          >
            Start using Pro
          </button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal onClose={onClose} width="w-[440px]">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-1">
        <Star size={18} className="text-[#00c8d8]" />
        <h2 className="text-[19px] font-semibold text-[#e4eef5]">MeetingMind Pro</h2>
      </div>
      <p className="text-[12px] text-[#7a9ab5] mb-5">Unlock full power · $12 / month</p>

      {/* Features */}
      <div className="rounded-xl bg-[#16202b] border border-[rgba(0,200,220,0.10)] p-4 mb-5">
        <p className="text-[10px] font-semibold text-[#00c8d8] uppercase tracking-widest mb-3">
          What you get
        </p>
        <div className="flex flex-col gap-2">
          {PRO_FEATURES.map((f) => (
            <div key={f} className="flex items-center gap-2.5">
              <span className="w-4 h-4 rounded-full bg-[rgba(0,200,160,0.15)] flex items-center justify-center flex-shrink-0">
                <Check size={9} className="text-[#00c8a0]" strokeWidth={3} />
              </span>
              <span className="text-[12px] text-[#7a9ab5]">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="space-y-3">
        <div>
          <label className="block text-[10px] font-semibold text-[#7a9ab5] uppercase tracking-[0.07em] mb-1.5">
            Cardholder Name
          </label>
          <input
            className={inputClass("cardName")}
            placeholder="Raj Sharma"
            value={cardName}
            onChange={(e) => {
              setCardName(e.target.value)
              setErrors((p) => ({ ...p, cardName: false }))
            }}
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-[#7a9ab5] uppercase tracking-[0.07em] mb-1.5">
            Card Number
          </label>
          <input
            className={inputClass("cardNum")}
            placeholder="4242 4242 4242 4242"
            value={cardNum}
            maxLength={19}
            onChange={(e) => {
              setCardNum(formatCardNumber(e.target.value))
              setErrors((p) => ({ ...p, cardNum: false }))
            }}
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-[10px] font-semibold text-[#7a9ab5] uppercase tracking-[0.07em] mb-1.5">
              Expiry
            </label>
            <input
              className={inputClass("expiry")}
              placeholder="MM / YY"
              value={expiry}
              maxLength={7}
              onChange={(e) => {
                setExpiry(formatExpiry(e.target.value))
                setErrors((p) => ({ ...p, expiry: false }))
              }}
            />
          </div>
          <div className="flex-1">
            <label className="block text-[10px] font-semibold text-[#7a9ab5] uppercase tracking-[0.07em] mb-1.5">
              CVV
            </label>
            <input
              className={inputClass("cvv")}
              placeholder="•••"
              type="password"
              value={cvv}
              maxLength={3}
              onChange={(e) => {
                setCvv(e.target.value.replace(/\D/g, ""))
                setErrors((p) => ({ ...p, cvv: false }))
              }}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-5 w-full py-3 rounded-xl bg-[#00c8d8] text-[14px] font-semibold text-[#0a0f14] hover:bg-[#00e8ff] transition-colors"
      >
        Pay $12.00 · Activate Pro
      </button>
      <p className="text-[11px] text-[#3f5f78] text-center mt-2">Secured · Cancel anytime</p>
    </Modal>
  )
}

// ─── Notifications modal ──────────────────────────────────────────

interface Notification {
  id: number
  title: string
  time: string
  read: boolean
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 1, title: "Q2 Roadmap Sync — transcript ready",      time: "2 min ago",   read: false },
  { id: 2, title: "Investor Call summary generated",         time: "1 hour ago",  read: false },
  { id: 3, title: "You've reached your daily upload limit",  time: "3 hours ago", read: false },
  { id: 4, title: "Design Review Sprint 14 processed",       time: "Yesterday",   read: true  },
  { id: 5, title: "Marketing Weekly — 6 action items found", time: "Yesterday",   read: true  },
]

function NotificationsModal({ onClose }: { onClose: () => void }) {
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL_NOTIFICATIONS)
  const unreadCount = notifs.filter((n) => !n.read).length

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <Modal onClose={onClose} width="w-[380px]">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-[18px] font-semibold text-[#e4eef5]">Notifications</h2>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="text-[11px] text-[#00c8d8] hover:text-[#00e8ff] transition-colors"
          >
            Mark all read
          </button>
        )}
      </div>
      <p className="text-[12px] text-[#7a9ab5] mb-4">
        {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
      </p>

      <div className="flex flex-col">
        {notifs.map((n, i) => (
          <div
            key={n.id}
            className={`flex gap-3 py-3 ${
              i < notifs.length - 1 ? "border-b border-[rgba(0,200,220,0.07)]" : ""
            }`}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
              style={{ background: n.read ? "#3f5f78" : "#00c8d8" }}
            />
            <div className="flex-1 min-w-0">
              <p
                className={`text-[13px] leading-snug mb-0.5 ${
                  n.read ? "text-[#7a9ab5]" : "text-[#e4eef5]"
                }`}
              >
                {n.title}
              </p>
              <p className="text-[11px] text-[#3f5f78]">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}

// ─── Topbar ───────────────────────────────────────────────────────

export function Topbar() {
  const [showPro,   setShowPro]   = useState(false)
  const [showNotif, setShowNotif] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-[rgba(0,200,220,0.10)] bg-[#111820] px-6">
        {/* Search */}
        <div className="flex flex-1 items-center gap-4">
          <form className="w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#3f5f78]" />
              <input
                className="h-9 w-full rounded-lg border border-[rgba(0,200,220,0.10)] bg-[#16202b] pl-9 pr-3 py-2 text-[12px] text-[#e4eef5] outline-none placeholder:text-[#3f5f78] focus:border-[rgba(0,200,220,0.25)] focus:shadow-[0_0_0_3px_rgba(0,200,220,0.07)] transition-all"
                placeholder="Search meetings..."
              />
            </div>
          </form>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Bell */}
          <button
            type="button"
            onClick={() => setShowNotif(true)}
            className="relative w-8 h-8 rounded-lg bg-[#16202b] border border-[rgba(0,200,220,0.10)] flex items-center justify-center text-[#7a9ab5] hover:border-[rgba(0,200,220,0.25)] hover:text-[#00c8d8] transition-all"
          >
            <Bell size={15} />
            <span className="absolute top-[7px] right-[7px] w-[5px] h-[5px] rounded-full bg-[#00c8d8] border border-[#111820]" />
          </button>

          {/* Pro button */}
          <button
            type="button"
            onClick={() => setShowPro(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[rgba(0,200,220,0.22)] bg-[rgba(0,200,220,0.08)] text-[#00c8d8] text-[12px] font-semibold hover:bg-[rgba(0,200,220,0.14)] hover:border-[rgba(0,200,220,0.40)] transition-all"
          >
            <Star size={12} className="text-[#00c8d8]" />
            Pro
          </button>

          {/* Avatar */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#00c8d8] to-[#0066aa] text-xs font-semibold text-white cursor-pointer select-none">
            U
          </div>
        </div>
      </header>

      {/* Modals */}
      {showPro && (
        <Overlay onClose={() => setShowPro(false)}>
          <ProModal onClose={() => setShowPro(false)} />
        </Overlay>
      )}

      {showNotif && (
        <Overlay onClose={() => setShowNotif(false)}>
          <NotificationsModal onClose={() => setShowNotif(false)} />
        </Overlay>
      )}
    </>
  )
}