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
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-start focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-9 rounded-md px-3",
          size === "lg" && "h-11 rounded-md px-8",
          size === "icon" && "h-10 w-10",
          variant === "default" && "bg-gradient-brand text-white shadow-sm hover:opacity-90",
          variant === "outline" && "border border-gray-200 bg-white hover:bg-gray-100 text-dark hover:shadow-card-hover",
          variant === "ghost" && "hover:bg-gray-100 text-dark",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
