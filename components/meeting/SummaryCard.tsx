import { Card } from "@/components/ui/Card"
import { Sparkles, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"

interface SummaryCardProps {
  summary: string
}

export function SummaryCard({ summary }: SummaryCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-dark">AI Summary</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={handleCopy} title="Copy to clipboard">
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-500" />}
        </Button>
      </div>
      <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed overflow-y-auto">
        {summary ? (
          <p>{summary}</p>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center">
            <div className="animate-pulse flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
              <Sparkles className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">Generating summary...</p>
            <p className="text-sm text-gray-400 mt-1">Our AI is analyzing the transcript</p>
          </div>
        )}
      </div>
    </Card>
  )
}
