import { Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type ProcessingStep = "uploading" | "transcribing" | "summarising" | "ready"

interface ProcessingStepsProps {
  currentStep: ProcessingStep
}

const steps = [
  { id: "uploading", label: "Upload" },
  { id: "transcribing", label: "Transcribe" },
  { id: "summarising", label: "Summarise" },
  { id: "ready", label: "Done" },
]

export function ProcessingSteps({ currentStep }: ProcessingStepsProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <div className="flex items-center justify-between relative">
        {/* Connection line background */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full z-0" />
        
        {/* Active connection line */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-brand rounded-full z-0 transition-all duration-500 ease-out" 
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isComplete = index < currentIndex
          const isActive = index === currentIndex
          const isPending = index > currentIndex

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-4 shadow-sm transition-all duration-500",
                  isComplete ? "bg-brand-start border-white" : 
                  isActive ? "bg-white border-brand-start shadow-md scale-110" : 
                  "bg-white border-gray-100 text-gray-300"
                )}
              >
                {isComplete ? (
                  <Check className="h-5 w-5 text-white" />
                ) : isActive ? (
                  <Loader2 className="h-5 w-5 text-brand-start animate-spin" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>
              <span 
                className={cn(
                  " mt-3 text-sm font-medium transition-colors",
                  isActive ? "text-dark" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
