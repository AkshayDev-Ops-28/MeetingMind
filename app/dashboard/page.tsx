"use client"


import { useEffect } from "react"
import { StatCard } from "@/components/ui/StatCard"
import { MeetingCard } from "@/components/meeting/MeetingCard"
import { Clock, Video, ListMusic } from "lucide-react"
import { useMeetings } from "@/hooks/useMeetings"
import { SkeletonCard } from "@/components/ui/SkeletonCard"

export default function DashboardPage() {
  const { meetings, loading, fetchMeetings } = useMeetings()

  useEffect(() => {
    fetchMeetings()
  }, [fetchMeetings])

  const totalDurationSeconds = meetings.reduce(
    (acc, m) => acc + (m.duration_seconds || 0), 0
  )
  const totalHours = Math.floor(totalDurationSeconds / 3600)
  const totalMinutes = Math.floor((totalDurationSeconds % 3600) / 60)
  const avgSeconds = meetings.length
    ? Math.floor(totalDurationSeconds / meetings.length)
    : 0
  const avgMinutes = Math.floor(avgSeconds / 60)

  return (
    <div className="p-8 space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-bold text-dark tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-1">Here is the overview of your meetings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Meetings"
          value={String(meetings.length)}
          icon={<ListMusic className="h-5 w-5 text-brand-end" />}
          description="All time"
        />
        <StatCard
          title="Audio Processed"
          value={`${totalHours}h ${totalMinutes}m`}
          icon={<Clock className="h-5 w-5 text-blue-500" />}
          description="Total recording duration"
        />
        <StatCard
          title="Avg. Meeting Time"
          value={`${avgMinutes}m`}
          icon={<Video className="h-5 w-5 text-purple-500" />}
          description="Per meeting average"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <h2 className="text-xl font-semibold text-dark tracking-tight">
            Recent Meetings
          </h2>
        </div>

       {loading && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
       <SkeletonCard key={i} />
       ))}
   </div>
)}

        {!loading && meetings.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <p className="text-gray-400 text-lg font-medium">
              No meetings yet
            </p>
            <p className="text-gray-400 text-sm">
              Upload your first recording to get started
            </p>
            <a
              href="/upload"
              className="inline-block mt-4 px-6 py-2 rounded-lg bg-gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Upload a meeting
            </a>
          </div>
        )}

        {!loading && meetings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {meetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                id={meeting.id}
                title={meeting.title}
                date={new Date(meeting.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                duration={
                  meeting.duration_seconds
                    ? `${Math.floor(meeting.duration_seconds / 60)}m`
                    : "Unknown"
                }
                status={meeting.status}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}