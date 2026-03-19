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
  }, [disabled])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      validateAndSetFile(files[0])
    }
  }

  const validateAndSetFile = (file: File) => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/x-m4a', 'video/mp4']
    if (validTypes.includes(file.type)) {
      setSelectedFile(file)
      onFileSelect(file)
    } else {
      alert("Invalid file type. Please upload MP3, WAV, M4A or MP4.")
    }
  }

  return (
    <Card 
      className={cn(
        "relative flex flex-col items-center justify-center p-12 text-center border-2 border-dashed transition-all",
        isDragging ? "border-brand-start bg-brand-start/5" : "border-gray-200 hover:border-brand-start/50 hover:bg-gray-50",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="audio/mpeg,audio/wav,audio/x-m4a,video/mp4"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        onChange={handleFileChange}
        disabled={disabled || !!selectedFile}
      />
      
      {!selectedFile ? (
        <>
          <div className="rounded-full bg-brand-start/10 p-4 mb-4">
            <UploadCloud className="h-8 w-8 text-brand-start" />
          </div>
          <h3 className="text-xl font-bold text-dark mb-2">Upload Recording</h3>
          <p className="text-sm text-gray-500 max-w-sm mb-6">
            Drag and drop your audio or video file here, or click to browse
          </p>
          <div className="flex gap-2 text-xs font-semibold text-gray-400">
            <span className="bg-white px-2 py-1 rounded border border-gray-100">MP3</span>
            <span className="bg-white px-2 py-1 rounded border border-gray-100">WAV</span>
            <span className="bg-white px-2 py-1 rounded border border-gray-100">M4A</span>
            <span className="bg-white px-2 py-1 rounded border border-gray-100">MP4</span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center w-full z-10 pointer-events-auto">
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full max-w-md">
            <div className="bg-brand-start/10 p-3 rounded-lg text-brand-start">
              <FileAudio className="h-6 w-6" />
            </div>
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-sm font-semibold text-dark truncate">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.preventDefault()
                setSelectedFile(null)
              }}
              disabled={disabled}
            >
              <X className="h-5 w-5 text-gray-400 hover:text-red-500" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
