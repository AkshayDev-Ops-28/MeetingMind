import * as React from "react"
import { cn } from "@/lib/utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[rgba(0,200,220,0.20)] bg-[#16202b] px-3 py-2 text-sm text-[#e4eef5] ring-offset-[#0a0f14] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#3f5f78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c8d8] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
export type { InputProps }