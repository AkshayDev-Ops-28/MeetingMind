import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-[#111820] border border-[rgba(0,200,220,0.10)] rounded-xl p-6 transition-all duration-200 hover:border-[rgba(0,200,220,0.20)]",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

export { Card }