"use client"

import { useEffect, useState } from "react"
import { SummaryCard } from "@/components/meeting/SummaryCard"
import { TranscriptPanel } from "@/components/meeting/TranscriptPanel"
import { ActionItems } from "@/components/meeting/ActionItems"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useMeetings } from "@/hooks/useMeetings"

interface MeetingDetail {
  id: string
  title: string
  status: string
  transcript: string | null
  summary: string | null
  decisions: string[] | null
  action_items: string[] | null
  duration_seconds: number | null
  created_at: string
}

export default function MeetingDetailPage() {
  const params = useParams()
  const meetingId = params?.id as string
  const { fetchMeetingById } = useMeetings()
  const [meeting, setMeeting] = useState<MeetingDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      if (!meetingId) return
      const data = await fetchMeetingById(meetingId)
      setMeeting(data)
      setLoading(false)
    }
    load()
  }, [meetingId, fetchMeetingById])

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <p className="text-gray-400">Loading meeting...</p>
      </div>
    )
  }

  if (!meeting) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-full gap-4">
        <p className="text-gray-400 text-lg">Meeting not found.</p>
        <Link href="/dashboard">
          <Button variant="ghost">Back to Dashboard</Button>
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(meeting.created_at).toLocaleDateString(
    "en-IN", { day: "numeric", month: "short", year: "numeric" }
  )
  const formattedDuration = meeting.duration_seconds
    ? `${Math.floor(meeting.duration_seconds / 60)}m`
    : "Unknown"

  return (
    <div className="p-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mb-2 text-gray-500 hover:text-dark -ml-3">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-dark tracking-tight">
              {meeting.title}
            </h1>
            <Badge variant="success">
              {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formattedDuration}</span>
            </div>
          </div>
        </div>
      </div>

      {meeting.decisions && meeting.decisions.length > 0 && (
        <Card className="border-l-4 border-l-brand-start">
          <h3 className="font-bold text-dark mb-3">Key Decisions</h3>
          <div className="flex flex-wrap gap-2">
            {meeting.decisions.map((d, i) => (
              <div
                key={i}
                className="bg-brand-start/5 text-dark text-sm px-3 py-1.5 rounded-lg font-medium"
              >
                {d}
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SummaryCard summary={meeting.summary || ""} />
          <TranscriptPanel transcript={meeting.transcript || ""} />
        </div>
        <div>
          <ActionItems items={meeting.action_items || []} />
        </div>
      </div>
    </div>
  )
}