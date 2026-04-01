"use client"

import { useEffect } from "react"
import { StatCard } from "@/components/ui/StatCard"
import { MeetingCard } from "@/components/meeting/MeetingCard"
import { Clock, Video, ListMusic, UploadCloud } from "lucide-react"
import { useMeetings } from "@/hooks/useMeetings"
import { SkeletonCard } from "@/components/ui/SkeletonCard"
import Link from "next/link"

export default function DashboardPage() {
  const { meetings, loading, fetchMeetings } = useMeetings()

  useEffect(() => {
    fetchMeetings()
  }, [fetchMeetings])

  const totalDurationSeconds = meetings.reduce((acc, m) => acc + (m.duration_seconds || 0), 0)
  const totalHours = Math.floor(totalDurationSeconds / 3600)
  const totalMinutes = Math.floor((totalDurationSeconds % 3600) / 60)
  const avgSeconds = meetings.length ? Math.floor(totalDurationSeconds / meetings.length) : 0
  const avgMinutes = Math.floor(avgSeconds / 60)

  return (
    <div className="p-6 space-y-6 animate-in fade-in zoom-in-95 duration-300">

      {/* Greeting */}
      <div>
        <h1 className="font-display text-[18px] font-semibold text-[#e4eef5] tracking-tight">Dashboard</h1>
        <p className="text-[13px] text-[#7a9ab5] mt-0.5">Here is the overview of your meetings</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatCard
          title="Total Meetings"
          value={String(meetings.length)}
          icon={<ListMusic className="h-4 w-4 text-[#00c8d8]" />}
          description={`↑ ${meetings.length} all time`}
        />
        <StatCard
          title="Audio Processed"
          value={`${totalHours}h ${totalMinutes}m`}
          icon={<Clock className="h-4 w-4 text-[#00c8d8]" />}
          description="Total recording duration"
        />
        <StatCard
          title="Avg. Meeting Time"
          value={`${avgMinutes}m`}
          icon={<Video className="h-4 w-4 text-[#00c8d8]" />}
          description="Per meeting average"
        />
      </div>

      {/* Upload CTA Strip */}
      <Link href="/upload">
        <div className="relative flex flex-col items-center justify-center bg-[#111820] border border-dashed border-[rgba(0,200,220,0.20)] rounded-xl p-5 gap-2 cursor-pointer overflow-hidden transition-all duration-200 hover:border-[#00c8d8] hover:bg-[#16202b]">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,200,220,0.06) 0%, transparent 70%)" }} />
          <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#00c8d8] to-[#0099bb] flex items-center justify-center">
            <UploadCloud className="h-5 w-5 text-black" />
          </div>
          <div className="font-display text-[13px] font-semibold text-[#e4eef5]">Upload a new meeting</div>
          <div className="text-[11px] text-[#3f5f78]">Drop an audio or video file, or click to browse</div>
          <div className="text-[11px] font-medium bg-[rgba(0,200,220,0.12)] text-[#00c8d8] border border-[rgba(0,200,220,0.20)] rounded-[20px] px-3 py-[3px]">
            Free plan
          </div>
        </div>
      </Link>

      {/* Recent Meetings */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-display text-[13px] font-semibold text-[#e4eef5]">Recent activity</span>
          <Link href="/meetings" className="text-[12px] text-[#00c8d8] hover:text-[#00e8ff] transition-colors">
            Open all meetings →
          </Link>
        </div>

        {loading && (
          <div className="flex flex-col gap-2">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && meetings.length === 0 && (
          <div className="text-center py-12 space-y-2 border border-dashed border-[rgba(0,200,220,0.10)] rounded-xl">
            <p className="text-[#7a9ab5] text-sm font-medium">No meetings yet</p>
            <p className="text-[#3f5f78] text-xs">Upload your first recording to get started</p>
          </div>
        )}

        {!loading && meetings.length > 0 && (
          <div className="flex flex-col gap-2">
            {meetings.slice(0, 3).map((meeting) => (
              <MeetingCard
                key={meeting.id}
                id={meeting.id}
                title={meeting.title}
                date={new Date(meeting.created_at).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric",
                })}
                duration={meeting.duration_seconds ? `${Math.floor(meeting.duration_seconds / 60)}m` : "Unknown"}
                status={meeting.status}
              />
            ))}
            <div className="flex items-center justify-center py-2 border border-dashed border-[rgba(0,200,220,0.10)] rounded-lg cursor-pointer text-[12px] text-[#3f5f78] hover:text-[#7a9ab5] transition-colors">
              <Link href="/meetings">View all in Meetings →</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}