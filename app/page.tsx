"use client"

import { Button } from "@/components/ui/Button"
import { Navbar } from "@/components/layout/Navbar"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0a0f14]">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        {/* Aqua radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,200,220,0.08) 0%, transparent 70%)" }}
        />

        <div className="z-10 max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-[#e4eef5]">
            Never Forget a <br />
            <span className="text-gradient-brand">Meeting Detail</span> Again
          </h1>
          <p className="text-xl text-[#7a9ab5] max-w-2xl mx-auto leading-relaxed">
            Upload your audio, and we transcribe, summarize, and extract actionable insights instantly. Protected with local Face Verification.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/auth?tab=signup">
              <Button size="lg" className="text-lg font-semibold h-12 px-8">
                Start for free
              </Button>
            </Link>
            <Link href="/auth?tab=login">
              <Button variant="outline" size="lg" className="text-lg h-12 px-8">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}