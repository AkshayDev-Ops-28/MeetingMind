import { Card } from "./Card"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
}

export function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card className="flex flex-col h-full justify-between">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="text-dark bg-gray-100 p-2 rounded-full">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-dark">{value}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
    </Card>
  )
}
