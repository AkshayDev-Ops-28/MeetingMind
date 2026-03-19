import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Calendar, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"

interface MeetingCardProps {
  id: string
  title: string
  date: string
  duration: string
  status: "uploading" | "transcribing" | "summarising" | "ready"
}

export function MeetingCard({ id, title, date, duration, status }: MeetingCardProps) {
  const getStatusBadge = () => {
    switch(status) {
      case "ready": return <Badge variant="success">Ready</Badge>
      case "uploading": return <Badge variant="default">Uploading...</Badge>
      case "transcribing": return <Badge variant="default">Transcribing...</Badge>
      case "summarising": return <Badge variant="brand">Summarising...</Badge>
    }
  }

  return (
    <Link href={`/meetings/${id}`}>
      <Card className="group flex items-center justify-between cursor-pointer">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-dark text-lg">{title}</h3>
            {getStatusBadge()}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
        <div className="text-gray-400 group-hover:text-brand-start transition-colors">
          <ChevronRight className="h-6 w-6" />
        </div>
      </Card>
    </Link>
  )
}
