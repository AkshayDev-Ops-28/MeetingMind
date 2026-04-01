export function SkeletonCard() {
  return (
    <div className="bg-[#111820] border border-[rgba(0,200,220,0.10)] rounded-xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-5 bg-[#16202b] rounded w-3/4 mb-2" />
          <div className="h-4 bg-[#16202b] rounded w-1/2" />
        </div>
        <div className="h-6 bg-[#16202b] rounded w-16" />
      </div>
      <div className="flex gap-4 mt-4">
        <div className="h-4 bg-[#16202b] rounded w-24" />
        <div className="h-4 bg-[#16202b] rounded w-20" />
      </div>
    </div>
  )
}