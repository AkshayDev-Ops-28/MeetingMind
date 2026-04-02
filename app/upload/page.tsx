"use client"

import { useRouter } from "next/navigation"
import { DropZone } from "@/components/upload/DropZone"
import { ProcessingSteps, type ProcessingStep } from "@/components/upload/ProcessingSteps"
import { useState } from "react"
import { createClient } from "@/lib/supabase"
import toast from "react-hot-toast"

export default function UploadPage() {
  const [currentStep, setCurrentStep] = useState<ProcessingStep | null>(null)
  const router = useRouter()

  const handleUpload = async (file: File) => {
    try {
      setCurrentStep("uploading")

      const formData = new FormData()
      formData.append("file", file)

      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        toast.error("You must be logged in to upload files")
        setCurrentStep(null)
        return
      }

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { authorization: `Bearer ${session.access_token}` },
        body: formData,
      })
      if (!uploadRes.ok) throw new Error("Upload failed")
      const { meetingId } = await uploadRes.json()

      setCurrentStep("transcribing")
      const transcribeRes = await fetch("/api/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ meetingId }),
      })
      if (!transcribeRes.ok) throw new Error("Transcription failed")

      setCurrentStep("summarising")
      const summarizeRes = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ meetingId }),
      })
      if (!summarizeRes.ok) throw new Error("Summarization failed")

      setCurrentStep("ready")
      setTimeout(() => router.push(`/meetings/${meetingId}`), 1200)
    } catch (err) {
      console.error("Pipeline error:", err)
      toast.error("Something went wrong during processing. Please try again.")
      setCurrentStep(null)
    }
  }

  return (
    <div className="min-h-full flex flex-col justify-center p-8">
      <div className="max-w-2xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(0,200,220,0.08)] border border-[rgba(0,200,220,0.18)] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00c8d8] animate-pulse" />
            <span className="text-xs font-medium text-[#00c8d8] tracking-widest uppercase font-[Space_Grotesk,sans-serif]">
              New Meeting
            </span>
          </div>
          <h1 className="text-4xl font-bold text-[#e4eef5] tracking-tight font-[Space_Grotesk,sans-serif]">
            Upload Recording
          </h1>
          <p className="text-[#7a9ab5] max-w-md mx-auto leading-relaxed text-sm">
            Drop in your audio or video file. We&apos;ll transcribe, analyse, and surface every key insight automatically.
          </p>
        </div>

        {/* Processing panel */}
        {currentStep && (
          <div className="rounded-2xl bg-[#111820] border border-[rgba(0,200,220,0.15)] p-6 shadow-[0_0_40px_rgba(0,200,220,0.06)] animate-in fade-in slide-in-from-top-3 duration-400">
            <p className="text-center text-xs font-semibold text-[#7a9ab5] uppercase tracking-widest mb-6 font-[Space_Grotesk,sans-serif]">
              Processing
            </p>
            <ProcessingSteps currentStep={currentStep} />
          </div>
        )}

        {/* Drop zone */}
        <DropZone onFileSelect={handleUpload} disabled={currentStep !== null} />

        {/* Footer hint */}
        {!currentStep && (
          <p className="text-center text-xs text-[#3f5f78]">
            Max file size 500 MB · Supported: MP3, WAV, M4A, MP4
          </p>
        )}
      </div>
    </div>
  )
}