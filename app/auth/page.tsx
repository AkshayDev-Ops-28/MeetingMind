"use client"

import { Suspense } from "react"
import { AuthForm } from "@/components/auth/AuthForm"
import { Mic } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-page">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-start rounded-full blur-[120px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-end rounded-full blur-[120px] opacity-10 pointer-events-none" />
      
      <div className="w-full max-w-sm flex flex-col items-center z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Link href="/" className="flex items-center gap-2 mb-8 group hover:opacity-90 transition-opacity">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand shadow-md">
            <Mic className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-dark group-hover:text-brand-start transition-colors">
            MeetingMind
          </span>
        </Link>
        
        <Suspense fallback={<div className="w-full h-64 animate-pulse bg-white rounded-[14px]" />}>
          <AuthForm />
        </Suspense>
      </div>
    </div>
  )
}
