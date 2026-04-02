"use client"

import { useState, useCallback } from "react"
import { UploadCloud, FileAudio, X } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface DropZoneProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
}

export function DropZone({ onFileSelect, disabled = false }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const validateAndSetFile = useCallback((file: File) => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/x-m4a', 'video/mp4']
    if (validTypes.includes(file.type)) {
      setSelectedFile(file)
      onFileSelect(file)
    } else {
      alert("Invalid file type. Please upload MP3, WAV, M4A or MP4.")
    }
  }, [onFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      validateAndSetFile(files[0])
    }
  }, [disabled, validateAndSetFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      validateAndSetFile(files[0])
    }
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed transition-all duration-300",
        "bg-[#111820]",
        isDragging
          ? "border-[#00c8d8] bg-[rgba(0,200,220,0.06)] shadow-[0_0_40px_rgba(0,200,220,0.15)]"
          : "border-[rgba(0,200,220,0.20)] hover:border-[rgba(0,200,220,0.45)] hover:bg-[rgba(0,200,220,0.04)] hover:shadow-[0_0_30px_rgba(0,200,220,0.10)]",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Animated corner accents */}
      <span className="pointer-events-none absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[rgba(0,200,220,0.35)] rounded-tl-md" />
      <span className="pointer-events-none absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[rgba(0,200,220,0.35)] rounded-tr-md" />
      <span className="pointer-events-none absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[rgba(0,200,220,0.35)] rounded-bl-md" />
      <span className="pointer-events-none absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[rgba(0,200,220,0.35)] rounded-br-md" />

      <input
        type="file"
        accept="audio/mpeg,audio/wav,audio/x-m4a,video/mp4"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        onChange={handleFileChange}
        disabled={disabled || !!selectedFile}
      />

      {!selectedFile ? (
        <>
          {/* Icon with glow ring */}
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-full bg-[#00c8d8] opacity-20 blur-xl scale-150" />
            <div className="relative rounded-full bg-[rgba(0,200,220,0.12)] border border-[rgba(0,200,220,0.25)] p-5">
              <UploadCloud className="h-9 w-9 text-[#00c8d8]" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#e4eef5] mb-2 font-[Space_Grotesk,sans-serif] tracking-tight">
            Upload Recording
          </h3>
          <p className="text-sm text-[#7a9ab5] max-w-sm mb-6 leading-relaxed">
            Drag and drop your audio or video file here, or click to browse
          </p>

          {/* Format badges */}
          <div className="flex gap-2 text-xs font-semibold text-[#7a9ab5]">
            {["MP3", "WAV", "M4A", "MP4"].map((fmt) => (
              <span
                key={fmt}
                className="px-2.5 py-1 rounded-md bg-[#16202b] border border-[rgba(0,200,220,0.15)] text-[#00c8d8] tracking-wider"
              >
                {fmt}
              </span>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center w-full z-10 pointer-events-auto">
          <div className="flex items-center gap-4 bg-[#16202b] p-4 rounded-xl border border-[rgba(0,200,220,0.20)] w-full max-w-md">
            <div className="bg-[rgba(0,200,220,0.12)] p-3 rounded-lg border border-[rgba(0,200,220,0.20)]">
              <FileAudio className="h-6 w-6 text-[#00c8d8]" />
            </div>
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-sm font-semibold text-[#e4eef5] truncate">{selectedFile.name}</p>
              <p className="text-xs text-[#7a9ab5] mt-0.5">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                setSelectedFile(null)
              }}
              disabled={disabled}
              className="text-[#3f5f78] hover:text-red-400 hover:bg-red-400/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}