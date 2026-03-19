"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 shadow-sm">
      <div className="flex flex-1 items-center gap-4">
        <form className="w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input 
              className="h-9 w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-500 focus:border-brand-start focus:ring-1 focus:ring-brand-start transition-all"
              placeholder="Search meetings..."
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          <span className="sr-only">Notifications</span>
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand text-sm font-medium text-white shadow-sm ring-2 ring-white cursor-pointer select-none">
          U
        </div>
      </div>
    </header>
  )
}
