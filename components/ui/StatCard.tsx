import { Card } from "./Card"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
}

export function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card className="flex flex-col h-full justify-between relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00c8d8] to-transparent" />
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-medium text-[#3f5f78] uppercase tracking-[0.08em]">{title}</p>
        <div className="bg-[rgba(0,200,220,0.12)] border border-[rgba(0,200,220,0.15)] p-2 rounded-lg">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="font-display text-[26px] font-semibold text-[#e4eef5] leading-none">{value}</h3>
        {description && <p className="text-[11px] text-[#00c8a0] mt-1">{description}</p>}
      </div>
    </Card>
  )
}