"use client"

import { useState, useRef, useEffect } from "react"
import { Camera, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
// Import would be active when using real setup
// import * as faceapi from 'face-api.js';

interface FaceVerifyProps {
  onVerify: (success: boolean) => void
  onCancel: () => void
}

export function FaceVerify({ onVerify, onCancel }: FaceVerifyProps) {
  const [loading, setLoading] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [verified, setVerified] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Simulated face API setup
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setHasPermission(true)
      } catch (err) {
        setHasPermission(false)
        console.error("error:", err)
      }
    }

    startVideo()
    
    // Cleanup
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const handleVerify = () => {
    setLoading(true)
    // Simulate face verification processing
    setTimeout(() => {
      setLoading(false)
      setVerified(true)
      setTimeout(() => onVerify(true), 1500)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-card w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-250">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-4 top-4 z-10 bg-white/50 backdrop-blur"
          onClick={onCancel}
        >
          <X className="h-5 w-5 text-gray-500" />
        </Button>
        
        <div className="p-6 text-center border-b border-gray-100">
          <h2 className="text-xl font-bold text-dark">Face Verification</h2>
          <p className="text-sm text-gray-500 mt-1">Secondary layer for secure entry</p>
        </div>

        <div className="p-6 flex flex-col items-center justify-center">
          {hasPermission === false ? (
            <div className="text-center py-8">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-dark font-medium mb-1">Camera access denied</p>
              <p className="text-sm text-gray-500">Please enable camera permissions to use face verification.</p>
            </div>
          ) : (
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 mb-6 flex items-center justify-center border-2 border-dashed border-gray-300">
              {verified ? (
                <div className="absolute inset-0 bg-green-500/10 flex flex-col items-center justify-center text-green-600 transition-all z-20">
                  <CheckCircle className="h-16 w-16 mb-2" />
                  <span className="font-bold">Verified Successfully</span>
                </div>
              ) : null}
              
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline
                className={`object-cover w-full h-full ${verified ? 'opacity-50 blur-sm' : ''} transition-all`}
              />
              
              {/* Overlay Face Guide */}
              {!verified && (
                <div className="absolute inset-0 pointer-events-none p-8">
                  <div className="w-full h-full border-2 border-brand-start rounded-full opacity-50 shadow-[0_0_0_9999px_rgba(0,0,0,0.3)]"></div>
                </div>
              )}
            </div>
          )}

          <Button 
            className="w-full bg-gradient-brand text-white font-semibold shadow-sm hover:opacity-90"
            onClick={handleVerify}
            disabled={loading || hasPermission === false || verified}
          >
            {loading ? "Scanning Face..." : verified ? "Done" : "Verify Face ID"}
          </Button>
          <p className="text-xs text-gray-400 mt-4 text-center">
            Face data runs purely locally on your device and is securely transmitted.
          </p>
        </div>
      </div>
    </div>
  )
}
