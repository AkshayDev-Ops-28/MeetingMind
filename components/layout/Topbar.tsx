"use client"

import { Bell, Search } from "lucide-react"

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-[rgba(0,200,220,0.10)] bg-[#111820] px-6">
      <div className="flex flex-1 items-center gap-4">
        <form className="w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#3f5f78]" />
            <input
              className="h-9 w-full rounded-lg border border-[rgba(0,200,220,0.10)] bg-[#16202b] pl-9 pr-3 py-2 text-[12px] text-[#e4eef5] outline-none placeholder:text-[#3f5f78] focus:border-[rgba(0,200,220,0.20)] transition-all"
              placeholder="Search meetings..."
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-8 h-8 rounded-lg bg-[#16202b] border border-[rgba(0,200,220,0.10)] flex items-center justify-center cursor-pointer hover:border-[rgba(0,200,220,0.20)] hover:text-[#00c8d8] text-[#7a9ab5] transition-all">
          <Bell className="h-4 w-4" />
          <span className="absolute top-[6px] right-[6px] w-[5px] h-[5px] rounded-full bg-[#00c8d8]"></span>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#00c8d8] to-[#0066aa] text-xs font-semibold text-white cursor-pointer select-none">
          U
        </div>
      </div>
    </header>
  )
}