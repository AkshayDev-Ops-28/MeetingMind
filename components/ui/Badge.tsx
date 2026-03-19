import * as React from "react"
import { cn } from "@/lib/utils"

function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" | "success" | "brand" }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" && "bg-dark text-white",
        variant === "brand" && "bg-gradient-brand text-white",
        variant === "outline" && "border border-gray-200 text-dark",
        variant === "success" && "bg-green-100 text-green-800",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
