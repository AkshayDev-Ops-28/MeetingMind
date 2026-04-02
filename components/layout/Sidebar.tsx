"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  UploadCloud,
  List,
  Settings,
  LogOut,
  Mic,
  ChevronDown,
  Eye,
  Trash2,
  X,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"

// ─── Types ────────────────────────────────────────────────────────

interface Meeting {
  id: string
  title: string
}

interface MeetingDay {
  label: string
  meetings: Meeting[]
}

// ─── Mock data ────────────────────────────────────────────────────

const INITIAL_DAYS: MeetingDay[] = [
  {
    label: "Today — Apr 2",
    meetings: [
      { id: "m1", title: "Q2 Roadmap Sync" },
      { id: "m2", title: "Investor Call — Series B" },
    ],
  },
  {
    label: "Yesterday — Apr 1",
    meetings: [
      { id: "m3", title: "Design Review Sprint 14" },
      { id: "m4", title: "Marketing Weekly" },
    ],
  },
  {
    label: "Mar 31",
    meetings: [
      { id: "m5", title: "All-Hands March" },
    ],
  },
]

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
  width = "w-[400px]",
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
        onClick={onClose}
        className="absolute top-3 right-3 w-7 h-7 rounded-md bg-[#16202b] border border-[rgba(0,200,220,0.12)] flex items-center justify-center text-[#7a9ab5] hover:text-[#e4eef5] transition-colors"
      >
        <X size={13} />
      </button>
      {children}
    </div>
  )
}

// ─── Toggle ───────────────────────────────────────────────────────

function Toggle({
  value,
  onChange,
}: {
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="relative w-9 h-5 rounded-full flex-shrink-0 transition-colors duration-200 border"
      style={{
        background:  value ? "#00c8d8" : "#16202b",
        borderColor: value ? "#00c8d8" : "rgba(0,200,220,0.20)",
      }}
    >
      <span
        className="absolute top-[3px] w-[14px] h-[14px] rounded-full bg-white transition-all duration-200"
        style={{ left: value ? "18px" : "3px" }}
      />
    </button>
  )
}

// ─── Settings modal ───────────────────────────────────────────────

function SettingsModal({ onClose }: { onClose: () => void }) {
  const [autoTranscribe, setAutoTranscribe] = useState(true)
  const [diarization,    setDiarization]    = useState(true)
  const [emailDigest,    setEmailDigest]    = useState(false)
  const [inApp,          setInApp]          = useState(true)

  return (
    <Modal onClose={onClose} width="w-[420px]">
      <h2 className="text-[18px] font-semibold text-[#e4eef5] mb-0.5">Settings</h2>
      <p className="text-[12px] text-[#7a9ab5] mb-3">Manage your preferences</p>

      {/* Account */}
      <p className="text-[10px] font-semibold text-[#3f5f78] uppercase tracking-widest mt-4 mb-1">
        Account
      </p>
      <div className="flex items-center justify-between py-2.5 border-b border-[rgba(0,200,220,0.07)]">
        <span className="text-[13px] text-[#e4eef5]">Display name</span>
        <span className="text-[12px] text-[#7a9ab5]">User</span>
      </div>
      <div className="flex items-center justify-between py-2.5 border-b border-[rgba(0,200,220,0.07)]">
        <span className="text-[13px] text-[#e4eef5]">Email</span>
        <span className="text-[12px] text-[#7a9ab5]">user@acme.io</span>
      </div>
      <div className="flex items-center justify-between py-2.5 border-b border-[rgba(0,200,220,0.07)]">
        <span className="text-[13px] text-[#e4eef5]">Plan</span>
        <span className="text-[12px] font-semibold text-[#00c8d8]">Free</span>
      </div>

      {/* Transcription */}
      <p className="text-[10px] font-semibold text-[#3f5f78] uppercase tracking-widest mt-5 mb-1">
        Transcription
      </p>
      <div className="flex items-center justify-between py-2.5 border-b border-[rgba(0,200,220,0.07)]">
        <span className="text-[13px] text-[#e4eef5]">Auto-transcribe on upload</span>
        <Toggle value={autoTranscribe} onChange={setAutoTranscribe} />
      </div>
      <div className="flex items-center justify-between py-2.5 border-b border-[rgba(0,200,220,0.07)]">
        <span className="text-[13px] text-[#e4eef5]">Speaker diarization</span>
        <Toggle value={diarization} onChange={setDiarization} />
      </div>
      <div className="flex items-center justify-between py-2.5 border-b border-[rgba(0,200,220,0.07)]">
        <span className="text-[13px] text-[#e4eef5]">Default language</span>
        <select className="bg-[#16202b] border border-[rgba(0,200,220,0.20)] rounded-lg text-[12px] text-[#e4eef5] px-2 py-1 outline-none cursor-pointer">
          <option>English</option>
          <option>Hindi</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>

      {/* Notifications */}
      <p className="text-[10px] font-semibold text-[#3f5f78] uppercase tracking-widest mt-5 mb-1">
        Notifications
      </p>
      <div className="flex items-center justify-between py-2.5 border-b border-[rgba(0,200,220,0.07)]">
        <span className="text-[13px] text-[#e4eef5]">Email digest</span>
        <Toggle value={emailDigest} onChange={setEmailDigest} />
      </div>
      <div className="flex items-center justify-between py-2.5 border-b border-[rgba(0,200,220,0.07)]">
        <span className="text-[13px] text-[#e4eef5]">In-app alerts</span>
        <Toggle value={inApp} onChange={setInApp} />
      </div>

      {/* Danger zone */}
      <p className="text-[10px] font-semibold text-[#3f5f78] uppercase tracking-widest mt-5 mb-1">
        Danger zone
      </p>
      <div className="flex items-center justify-between py-2.5">
        <span className="text-[13px] text-[#e05555]">Delete account</span>
        <button
          type="button"
          className="text-[11px] px-3 py-1 rounded-lg bg-[rgba(220,60,60,0.10)] border border-[rgba(220,60,60,0.25)] text-[#e05555] hover:bg-[rgba(220,60,60,0.20)] transition-colors"
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}

// ─── Sign-out confirm ─────────────────────────────────────────────

function SignOutModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <Modal onClose={onClose} width="w-[360px]">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-[rgba(0,200,220,0.10)] border border-[rgba(0,200,220,0.20)] flex items-center justify-center mb-4">
          <LogOut size={20} className="text-[#00c8d8]" />
        </div>
        <h2 className="text-[18px] font-semibold text-[#e4eef5] mb-1">Sign out?</h2>
        <p className="text-[13px] text-[#7a9ab5] leading-relaxed mb-6">
          You&apos;ll be returned to the login page. Any unsaved work won&apos;t be lost.
        </p>
        <div className="flex gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-[rgba(0,200,220,0.20)] bg-[#16202b] text-[13px] font-medium text-[#7a9ab5] hover:text-[#e4eef5] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-[#00c8d8] text-[13px] font-semibold text-[#0a0f14] hover:bg-[#00e8ff] transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </Modal>
  )
}

// ─── Delete confirm ───────────────────────────────────────────────

function DeleteModal({
  title,
  onClose,
  onConfirm,
}: {
  title: string
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <Modal onClose={onClose} width="w-[360px]">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-[rgba(220,60,60,0.10)] border border-[rgba(220,60,60,0.22)] flex items-center justify-center mb-4">
          <Trash2 size={20} className="text-[#e05555]" />
        </div>
        <h2 className="text-[18px] font-semibold text-[#e4eef5] mb-1">Delete session?</h2>
        <p className="text-[13px] text-[#7a9ab5] leading-relaxed mb-6">
          <span className="text-[#e4eef5] font-medium">&ldquo;{title}&rdquo;</span> and all its
          transcripts, summaries and action items will be permanently removed.
        </p>
        <div className="flex gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-[rgba(0,200,220,0.20)] bg-[#16202b] text-[13px] font-medium text-[#7a9ab5] hover:text-[#e4eef5] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-[rgba(220,60,60,0.85)] text-[13px] font-semibold text-white hover:bg-[rgb(220,60,60)] transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  )
}

// ─── Main export ──────────────────────────────────────────────────

export function Sidebar() {
  const pathname = usePathname()
  const { signOut } = useAuth()

  const [meetingsOpen, setMeetingsOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showSignOut,  setShowSignOut]  = useState(false)
  const [deleteId,     setDeleteId]     = useState<string | null>(null)
  const [days,         setDays]         = useState<MeetingDay[]>(INITIAL_DAYS)

  const allMeetings  = days.flatMap((d) => d.meetings)
  const deleteTarget = allMeetings.find((m) => m.id === deleteId) ?? null

  function handleDelete(id: string) {
    setDays((prev) =>
      prev
        .map((d) => ({ ...d, meetings: d.meetings.filter((m) => m.id !== id) }))
        .filter((d) => d.meetings.length > 0)
    )
    setDeleteId(null)
  }

  const isMeetingsActive = pathname.startsWith("/meetings")

  return (
    <>
      {/* ── Shell ── */}
      <div className="flex flex-col h-screen w-[220px] min-w-[220px] flex-shrink-0 bg-[#111820] border-r border-[rgba(0,200,220,0.10)] py-5 px-0 relative overflow-hidden">

        {/* Ambient glow */}
        <div
          className="absolute top-[-80px] left-[-40px] w-[200px] h-[200px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,200,220,0.08) 0%, transparent 70%)" }}
        />

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 pb-5 border-b border-[rgba(0,200,220,0.10)] mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c8d8] to-[#0088aa] flex items-center justify-center flex-shrink-0">
            <Mic size={14} className="text-black" />
          </div>
          <span className="font-semibold text-[13px] tracking-[0.04em] uppercase text-[#e4eef5] whitespace-nowrap">
            MeetingMind
          </span>
        </div>

        {/* Nav */}
        <nav
          className="flex flex-col px-3 flex-1 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <span className="text-[10px] font-medium text-[#3f5f78] uppercase tracking-[0.1em] px-2 py-2">
            Main
          </span>

          {/* Dashboard + Upload */}
          {([
            { name: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
            { name: "Upload",    href: "/upload",    Icon: UploadCloud },
          ] as const).map(({ name, href, Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/")
            return (
              <Link key={href} href={href} className="no-underline">
                <div
                  className={`flex items-center gap-2.5 px-2.5 py-[9px] rounded-lg text-[13px] mb-[1px] transition-colors duration-150 ${
                    active
                      ? "bg-[rgba(0,200,220,0.12)] text-[#00c8d8] font-medium border border-[rgba(0,200,220,0.20)]"
                      : "text-[#7a9ab5] hover:bg-[rgba(0,200,220,0.08)] hover:text-[#e4eef5]"
                  }`}
                >
                  <Icon size={15} className={active ? "text-[#00c8d8]" : "text-[#3f5f78]"} />
                  {name}
                </div>
              </Link>
            )
          })}

          {/* Meetings accordion */}
          <button
            type="button"
            onClick={() => setMeetingsOpen((p) => !p)}
            className={`flex items-center gap-2.5 px-2.5 py-[9px] rounded-lg text-[13px] mb-[1px] w-full text-left transition-colors duration-150 ${
              isMeetingsActive || meetingsOpen
                ? "bg-[rgba(0,200,220,0.12)] text-[#00c8d8] font-medium border border-[rgba(0,200,220,0.20)]"
                : "text-[#7a9ab5] hover:bg-[rgba(0,200,220,0.08)] hover:text-[#e4eef5]"
            }`}
          >
            <List
              size={15}
              className={isMeetingsActive || meetingsOpen ? "text-[#00c8d8]" : "text-[#3f5f78]"}
            />
            Meetings
            <ChevronDown
              size={13}
              className="ml-auto transition-transform duration-300"
              style={{ transform: meetingsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          {/* Tree */}
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: meetingsOpen ? "480px" : "0px" }}
          >
            {days.map((day) => (
              <div key={day.label}>
                <span className="block text-[10px] font-semibold text-[#3f5f78] uppercase tracking-[0.08em] px-2 pt-3 pb-1">
                  {day.label}
                </span>
                {day.meetings.map((m) => (
                  <div
                    key={m.id}
                    className="group flex items-center gap-2 mx-1 px-2 py-1.5 rounded-lg hover:bg-[rgba(0,200,220,0.07)] transition-colors mb-[1px]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00c8d8] flex-shrink-0 opacity-60" />
                    <span className="flex-1 text-[12px] text-[#7a9ab5] group-hover:text-[#e4eef5] truncate transition-colors">
                      {m.title}
                    </span>
                    {/* Hover actions */}
                    <div className="hidden group-hover:flex items-center gap-1 flex-shrink-0">
                      <Link href={`/meetings/${m.id}`}>
                        <button
                          type="button"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded bg-[rgba(0,200,220,0.12)] text-[#00c8d8] hover:bg-[rgba(0,200,220,0.22)] transition-colors"
                          title="View meeting"
                        >
                          <Eye size={11} />
                        </button>
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setDeleteId(m.id)
                        }}
                        className="p-1 rounded bg-[rgba(220,60,60,0.10)] text-[#e05555] hover:bg-[rgba(220,60,60,0.22)] transition-colors"
                        title="Delete session"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Preferences */}
          <span className="text-[10px] font-medium text-[#3f5f78] uppercase tracking-[0.1em] px-2 py-2 mt-2">
            Settings
          </span>
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-2.5 px-2.5 py-[9px] rounded-lg text-[13px] text-[#7a9ab5] hover:bg-[rgba(0,200,220,0.08)] hover:text-[#e4eef5] transition-colors duration-150 w-full text-left"
          >
            <Settings size={15} className="text-[#3f5f78]" />
            Preferences
          </button>
        </nav>

        {/* Footer */}
        <div className="px-3 pt-4 border-t border-[rgba(0,200,220,0.10)]">
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg">
            <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-[#00c8d8] to-[#0066aa] flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-[#e4eef5]">User</p>
              <p className="text-[11px] text-[#3f5f78]">Free plan</p>
            </div>
            <button
              type="button"
              onClick={() => setShowSignOut(true)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#3f5f78] hover:bg-[rgba(220,60,60,0.10)] hover:text-[#e05555] transition-colors"
              title="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Portalled modals ── */}
      {showSettings && (
        <Overlay onClose={() => setShowSettings(false)}>
          <SettingsModal onClose={() => setShowSettings(false)} />
        </Overlay>
      )}

      {showSignOut && (
        <Overlay onClose={() => setShowSignOut(false)}>
          <SignOutModal
            onClose={() => setShowSignOut(false)}
            onConfirm={() => {
              setShowSignOut(false)
              signOut()
            }}
          />
        </Overlay>
      )}

      {deleteId !== null && deleteTarget !== null && (
        <Overlay onClose={() => setDeleteId(null)}>
          <DeleteModal
            title={deleteTarget.title}
            onClose={() => setDeleteId(null)}
            onConfirm={() => handleDelete(deleteId)}
          />
        </Overlay>
      )}
    </>
  )
}