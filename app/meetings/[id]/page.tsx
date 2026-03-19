"use client"

import { SummaryCard } from "@/components/meeting/SummaryCard"
import { TranscriptPanel } from "@/components/meeting/TranscriptPanel"
import { ActionItems } from "@/components/meeting/ActionItems"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data — will be replaced with real fetch from Supabase
const mockMeeting = {
  id: "1",
  title: "Product Sync Q3 Planning",
  date: "Today, 10:00 AM",
  duration: "45 min",
  status: "ready" as const,
  summary: "The team discussed Q3 priorities including the new onboarding flow redesign, API rate-limiting improvements, and mobile push notification support. Marketing confirmed the launch date for the brand refresh campaign. Engineering will prioritize the authentication refactor before starting new feature work. Budget was approved for two additional contractor hires.",
  transcript: "Good morning everyone, let's get started with our Q3 planning sync.\n\nFirst up, let's talk about the onboarding flow. We've gotten feedback from the UX team that the current 5-step process has a 40% drop-off rate at step 3. The proposal is to consolidate steps 2 and 3 into a single screen.\n\nI agree with that approach. We should also look at adding progressive disclosure so users aren't overwhelmed.\n\nOn the engineering side, we need to address the API rate limiting before we onboard any enterprise clients. The current implementation won't scale past 1000 requests per minute.\n\nWhat's the timeline for that?\n\nI'd estimate 2-3 sprints. We need to implement token bucket algorithm and set up Redis for distributed rate limiting.\n\nMobile push notifications — where are we on that? The iOS implementation is complete and in QA. Android is about 70% done, we're working through some edge cases with background services on different manufacturers.\n\nMarketing update: the brand refresh campaign is confirmed for July 15th launch. All assets are being finalized this week.\n\nBudget note: we've been approved for two additional contractors to help with the auth refactor. I'll start the hiring process this week.\n\nGreat, let's reconvene next Wednesday. Everyone clear on their action items?",
  decisions: [
    "Consolidate onboarding steps 2 and 3 into one screen",
    "Prioritize API rate limiting before enterprise onboarding",
    "Brand refresh campaign launches July 15th",
    "Budget approved for 2 contractor hires"
  ],
  action_items: [
    "UX Team: Design consolidated onboarding screen by next Friday",
    "Backend: Implement token bucket rate limiting with Redis (2-3 sprints)",
    "Mobile: Complete Android push notification edge cases",
    "Marketing: Finalize all brand refresh assets this week",
    "HR: Begin contractor hiring for auth refactor team",
    "PM: Schedule follow-up sync for next Wednesday"
  ]
}

export default function MeetingDetailPage() {
  const params = useParams()
  const meeting = mockMeeting // In production: fetch by params.id

  return (
    <div className="p-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mb-2 text-gray-500 hover:text-dark -ml-3">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-dark tracking-tight">{meeting.title}</h1>
            <Badge variant="success">Ready</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{meeting.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{meeting.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Decisions */}
      {meeting.decisions && meeting.decisions.length > 0 && (
        <Card className="border-l-4 border-l-brand-start">
          <h3 className="font-bold text-dark mb-3">Key Decisions</h3>
          <div className="flex flex-wrap gap-2">
            {meeting.decisions.map((d, i) => (
              <div key={i} className="bg-brand-start/5 text-dark text-sm px-3 py-1.5 rounded-lg font-medium">
                {d}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SummaryCard summary={meeting.summary} />
          <TranscriptPanel transcript={meeting.transcript} />
        </div>
        <div>
          <ActionItems items={meeting.action_items} />
        </div>
      </div>
    </div>
  )
}
