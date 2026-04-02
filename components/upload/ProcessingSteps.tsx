"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type ProcessingStep = "uploading" | "transcribing" | "summarising" | "ready"

interface ProcessingStepsProps {
  currentStep: ProcessingStep
}

const steps = [
  {
    id: "uploading",
    label: "Upload",
    sublabel: "Sending file securely",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M10 13V4M10 4L6.5 7.5M10 4L13.5 7.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 16h12" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "transcribing",
    label: "Transcribe",
    sublabel: "Converting speech to text",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M4 6h12M4 10h8M4 14h5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "summarising",
    label: "Analyse",
    sublabel: "Extracting key insights",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="10" cy="10" r="3"/>
        <path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.05 5.05l1.41 1.41M13.54 13.54l1.41 1.41M5.05 14.95l1.41-1.41M13.54 6.46l1.41-1.41"/>
      </svg>
    ),
  },
  {
    id: "ready",
    label: "Ready",
    sublabel: "Your meeting is live",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M4 10.5l4.5 4.5 7.5-9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export function ProcessingSteps({ currentStep }: ProcessingStepsProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep)
  const progressPct = (currentIndex / (steps.length - 1)) * 100

  return (
    <div className="w-full max-w-2xl mx-auto select-none">
      {/* Step track */}
      <div className="relative flex items-start justify-between">

        {/* Background rail */}
        <div className="absolute left-0 top-[22px] w-full h-px bg-[rgba(0,200,220,0.10)] z-0" />

        {/* Animated fill rail */}
        <div
          className="absolute left-0 top-[22px] h-px z-0 transition-all duration-700 ease-in-out"
          style={{
            width: `${progressPct}%`,
            background: "linear-gradient(90deg, #00c8d8 0%, #00e8ff 100%)",
            boxShadow: "0 0 8px rgba(0,200,220,0.6)",
          }}
        />

        {steps.map((step, index) => {
          const isComplete = index < currentIndex
          const isActive = index === currentIndex
          const isPending = index > currentIndex

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center gap-3"
              style={{ flex: 1 }}
            >
              {/* Node */}
              <div
                className={cn(
                  "relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-500",
                  isComplete && "bg-[#00c8d8]",
                  isActive && "bg-[#111820] border-2 border-[#00c8d8]",
                  isPending && "bg-[#16202b] border border-[rgba(0,200,220,0.15)]"
                )}
                style={
                  isActive
                    ? { boxShadow: "0 0 0 5px rgba(0,200,220,0.12), 0 0 20px rgba(0,200,220,0.25)" }
                    : isComplete
                    ? { boxShadow: "0 0 14px rgba(0,200,220,0.35)" }
                    : {}
                }
              >
                {/* Ping animation on active */}
                {isActive && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-[#00c8d8] opacity-20 animate-ping" />
                    <span className="absolute inset-0 rounded-full bg-[#00c8d8] opacity-10 animate-ping" style={{ animationDelay: "0.3s" }} />
                  </>
                )}

                {/* Spinning arc on active */}
                {isActive && (
                  <svg
                    className="absolute inset-0 w-full h-full animate-spin"
                    style={{ animationDuration: "1.4s" }}
                    viewBox="0 0 44 44"
                    fill="none"
                  >
                    <circle
                      cx="22" cy="22" r="20"
                      stroke="#00c8d8"
                      strokeWidth="2"
                      strokeDasharray="30 96"
                      strokeLinecap="round"
                    />
                  </svg>
                )}

                {/* Icon */}
                <span
                  className={cn(
                    "transition-all duration-300",
                    isComplete && "text-[#0a0f14]",
                    isActive && "text-[#00c8d8]",
                    isPending && "text-[#3f5f78]"
                  )}
                >
                  {isComplete ? (
                    <Check className="w-5 h-5" strokeWidth={2.5} />
                  ) : (
                    step.icon
                  )}
                </span>
              </div>

              {/* Labels */}
              <div className="flex flex-col items-center text-center gap-0.5">
                <span
                  className={cn(
                    "text-sm font-semibold tracking-wide transition-colors duration-300 font-[Space_Grotesk,sans-serif]",
                    isActive && "text-[#00c8d8]",
                    isComplete && "text-[#e4eef5]",
                    isPending && "text-[#3f5f78]"
                  )}
                >
                  {step.label}
                </span>
                <span
                  className={cn(
                    "text-[11px] transition-colors duration-300 leading-tight max-w-[80px]",
                    isActive && "text-[#7a9ab5]",
                    isComplete && "text-[#3f5f78]",
                    isPending && "text-[#3f5f78] opacity-50"
                  )}
                >
                  {step.sublabel}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Status bar */}
      <div className="mt-8 rounded-xl bg-[#16202b] border border-[rgba(0,200,220,0.12)] overflow-hidden">
        <div
          className="h-1 transition-all duration-700 ease-in-out"
          style={{
            width: `${progressPct === 0 ? 8 : progressPct}%`,
            background: "linear-gradient(90deg, #00c8d8, #00e8ff)",
            boxShadow: "0 0 10px rgba(0,200,220,0.5)",
          }}
        />
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-[#7a9ab5]">
            {currentStep === "ready"
              ? "✓ All done — redirecting you now…"
              : `Step ${currentIndex + 1} of ${steps.length} — ${steps[currentIndex]?.sublabel}`}
          </span>
          <span className="text-xs font-semibold text-[#00c8d8] font-[Space_Grotesk,sans-serif]">
            {Math.round(progressPct === 0 ? 5 : progressPct)}%
          </span>
        </div>
      </div>
    </div>
  )
}