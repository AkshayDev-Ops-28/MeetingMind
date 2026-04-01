import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c8d8] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-9 rounded-md px-3",
          size === "lg" && "h-11 rounded-md px-8",
          size === "icon" && "h-10 w-10",
          variant === "default" && "bg-[#00c8d8] text-black font-semibold hover:bg-[#00e8ff]",
          variant === "outline" && "border border-[rgba(0,200,220,0.20)] bg-transparent text-[#e4eef5] hover:bg-[rgba(0,200,220,0.12)]",
          variant === "ghost" && "text-[#7a9ab5] hover:bg-[rgba(0,200,220,0.12)] hover:text-[#e4eef5]",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }