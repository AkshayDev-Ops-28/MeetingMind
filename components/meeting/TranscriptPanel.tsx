import { Card } from "@/components/ui/Card"
import { FileText } from "lucide-react"

interface TranscriptPanelProps {
  transcript: string
}

export function TranscriptPanel({ transcript }: TranscriptPanelProps) {
  return (
    <Card className="flex flex-col h-[600px]">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
          <FileText className="h-5 w-5 text-gray-600" />
        </div>
        <h2 className="text-xl font-bold text-dark">Full Transcript</h2>
      </div>
      <div className="flex-1 overflow-y-auto pr-2">
        {transcript ? (
          <div className="space-y-4">
            {transcript.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-500 font-medium">No transcript available</p>
          </div>
        )}
      </div>
    </Card>
  )
}
