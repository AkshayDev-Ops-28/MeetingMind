import * as React from "react"
import { cn } from "@/lib/utils"

function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "outline" | "success" | "brand"
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variant === "default" && "bg-[rgba(0,200,220,0.12)] text-[#00c8d8] border border-[rgba(0,200,220,0.20)]",
        variant === "brand" && "bg-[rgba(0,200,220,0.12)] text-[#00c8d8] border border-[rgba(0,200,220,0.20)]",
        variant === "outline" && "border border-[rgba(0,200,220,0.20)] text-[#7a9ab5]",
        variant === "success" && "bg-[rgba(0,200,140,0.12)] text-[#00c8a0] border border-[rgba(0,200,140,0.20)]",
        className
      )}
      {...props}
    />
  )
}

export { Badge }