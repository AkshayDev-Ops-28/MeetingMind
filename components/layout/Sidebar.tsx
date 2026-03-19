"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, UploadCloud, Mic, List, Settings, LogOut } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Upload", href: "/upload", icon: UploadCloud },
    { name: "Meetings", href: "/meetings", icon: List },
  ]

  return (
    <div className="flex h-screen w-64 flex-col justify-between bg-dark p-4 text-white">
      <div>
        <div className="flex items-center gap-2 px-2 py-4 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
            <Mic className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">MeetingMind</span>
        </div>
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white",
                  isActive ? "bg-gradient-brand text-white" : "text-gray-300"
                )}
              >
                <Icon className="h-5 w-5" />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>
      
      <div className="space-y-2">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white">
          <Settings className="h-5 w-5" />
          Settings
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-white/10 hover:text-red-300">
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
