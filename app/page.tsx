"use client"

import { Button } from "@/components/ui/Button"
import { Navbar } from "@/components/layout/Navbar"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        {/* Decorative background gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-brand rounded-full blur-[120px] opacity-10 pointer-events-none" />
        
        <div className="z-10 max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-dark">
            Never Forget a <br/> <span className="text-gradient-brand">Meeting Detail</span> Again
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Upload your audio, and we transcribe, summarize, and extract actionable insights instantly. Protected with local Face Verification.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/auth?tab=signup">
              <Button size="lg" className="text-lg bg-gradient-brand hover:opacity-90 shadow-lg font-semibold h-12 px-8">
                Start for free
              </Button>
            </Link>
            <Link href="/auth?tab=login">
              <Button variant="outline" size="lg" className="text-lg h-12 px-8 font-medium">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
