"use client"

import { useRouter } from "next/navigation"
import { DropZone } from "@/components/upload/DropZone"
import { ProcessingSteps, type ProcessingStep } from "@/components/upload/ProcessingSteps"
import { useState } from "react"

export default function UploadPage() {
  const [currentStep, setCurrentStep] = useState<ProcessingStep | null>(null)
  const router = useRouter()

  const handleUpload = async (file: File) => {
    try {
      setCurrentStep("uploading")

      // Step 1: Upload file to Supabase Storage via API route
      const formData = new FormData()
      formData.append("file", file)
      
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      
      if (!uploadRes.ok) throw new Error("Upload failed")
      const { meetingId } = await uploadRes.json()

      // Step 2: Transcribe
      setCurrentStep("transcribing")
      const transcribeRes = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingId }),
      })
      if (!transcribeRes.ok) throw new Error("Transcription failed")

      // Step 3: Summarise
      setCurrentStep("summarising")
      const summarizeRes = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingId }),
      })
      if (!summarizeRes.ok) throw new Error("Summarization failed")

      // Step 4: Done
      setCurrentStep("ready")
      setTimeout(() => router.push(`/meetings/${meetingId}`), 1000)
    } catch (err) {
      console.error("Pipeline error:", err)
      alert("Something went wrong. Please try again.")
      setCurrentStep(null)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 min-h-full flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-dark tracking-tight">Upload New Meeting</h1>
        <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
          Drag and drop an audio file. We&apos;ll automatically transcribe, analyze, and pull out your key insights.
        </p>
      </div>

      {currentStep && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-center mb-6 text-dark">Processing Upload</h3>
          <ProcessingSteps currentStep={currentStep} />
        </div>
      )}

      <DropZone onFileSelect={handleUpload} disabled={currentStep !== null} />
    </div>
  )
}
