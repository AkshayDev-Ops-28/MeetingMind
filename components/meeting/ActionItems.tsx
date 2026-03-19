import { Card } from "@/components/ui/Card"
import { CheckSquare, Circle, CheckCircle2 } from "lucide-react"

interface ActionItemsProps {
  items: string[]
}

export function ActionItems({ items }: ActionItemsProps) {
  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600">
          <CheckSquare className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-dark">Action Items</h2>
        <span className="ml-auto bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-xs font-semibold">
          {items?.length || 0}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {items && items.length > 0 ? (
          <ul className="space-y-3 pr-2">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 group cursor-pointer">
                <div className="mt-0.5 text-gray-300 group-hover:text-brand-start transition-colors">
                  <Circle className="h-5 w-5 fill-transparent" />
                </div>
                <span className="text-sm text-gray-700 leading-relaxed font-medium group-hover:text-dark transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-500 font-medium pb-8">No action items found</p>
          </div>
        )}
      </div>
    </Card>
  )
}
