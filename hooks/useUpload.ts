import { useState, useCallback } from "react"
import toast from "react-hot-toast"
import { createClient } from "@/lib/supabase"
import type { ProcessingStep } from "@/components/upload/ProcessingSteps"

export function useUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [currentStep, setCurrentStep] = useState<ProcessingStep | null>(null)
  const supabase = createClient()

  const uploadFile = useCallback(async (file: File) => {
    setIsUploading(true)
    setCurrentStep("uploading")

    try {
      const fileName = `${Date.now()}-${file.name}`
      const { data, error } = await supabase.storage
        .from('meeting-recordings')
        .upload(`public/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      toast.success("File uploaded successfully")
      setCurrentStep("transcribing")
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast.success("Transcription complete")
      setCurrentStep("summarising")
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast.success("Summary ready")
      setCurrentStep("ready")
      return `mock-meeting-id-${Date.now()}`

    } catch (err) {
      console.error("Upload error:", err)
      toast.error("Something went wrong. Please try again.")
      setCurrentStep(null)
      throw err
    } finally {
      setIsUploading(false)
    }
  }, [supabase])

  return { uploadFile, isUploading, currentStep }
}