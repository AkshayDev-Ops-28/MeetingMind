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
    switch (status) {
      case "ready": return <Badge variant="success">Processed</Badge>
      case "uploading": return <Badge variant="default">Uploading...</Badge>
      case "transcribing": return <Badge variant="default">Transcribing...</Badge>
      case "summarising": return <Badge variant="brand">Summarising...</Badge>
    }
  }

  return (
    <Link href={`/meetings/${id}`}>
      <Card className="group flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-[7px] h-[7px] rounded-full bg-[#00c8d8] shadow-[0_0_5px_rgba(0,200,220,0.25)] flex-shrink-0" />
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-medium text-[#e4eef5] text-[13px] truncate">{title}</h3>
              {getStatusBadge()}
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[#3f5f78]">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{duration}</span>
              </div>
            </div>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-[#3f5f78] group-hover:text-[#00c8d8] transition-colors flex-shrink-0" />
      </Card>
    </Link>
  )
}