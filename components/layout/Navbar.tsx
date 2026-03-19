"use client"

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Mic } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-dark text-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
            <Mic className="h-5 w-5 text-white" />
          </div>
          <Link href="/" className="text-xl font-bold tracking-tight">
            MeetingMind
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth">
            <Button variant="ghost" className="text-white hover:text-dark">
              Log in
            </Button>
          </Link>
          <Link href="/auth?tab=signup">
            <Button className="bg-gradient-brand border-0">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
