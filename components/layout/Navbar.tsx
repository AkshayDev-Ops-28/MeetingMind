"use client"

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Mic } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[rgba(0,200,220,0.10)] bg-[#111820] text-[#e4eef5] shadow-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#00c8d8] to-[#0088aa]">
            <Mic className="h-4 w-4 text-black" />
          </div>
          <Link href="/" className="font-display text-[13px] font-semibold tracking-[0.04em] uppercase text-[#e4eef5]">
            MeetingMind
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/auth?tab=signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}