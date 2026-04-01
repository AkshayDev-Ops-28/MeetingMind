"use client"

import { Suspense } from "react"
import { AuthForm } from "@/components/auth/AuthForm"
import { Mic } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#0a0f14]">
      {/* Aqua glow top-left */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00c8d8, transparent)" }} />
      {/* Aqua glow bottom-right */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00c8d8, transparent)" }} />

      <div className="w-full max-w-sm flex flex-col items-center z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Link href="/" className="flex items-center gap-2 mb-8 group hover:opacity-90 transition-opacity">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00c8d8] to-[#0088aa] shadow-md">
            <Mic className="h-6 w-6 text-black" />
          </div>
          <span className="font-display text-2xl font-semibold tracking-tight text-[#e4eef5]">
            MeetingMind
          </span>
        </Link>

        <Suspense fallback={<div className="w-full h-64 animate-pulse bg-[#111820] rounded-[14px]" />}>
          <AuthForm />
        </Suspense>
      </div>
    </div>
  )
}