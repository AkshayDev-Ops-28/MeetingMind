import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { verifyAuth } from "@/lib/auth-helpers"
import { withRetry } from "@/lib/utils"

export async function POST(req: NextRequest) {
  try {
    const { user, error: authError } = await verifyAuth(req)
  if (!user) {
  return NextResponse.json({ error: authError }, { status: 401 })
  }
  const { meetingId } = await req.json()

    if (!meetingId) {
      return NextResponse.json({ error: "Meeting ID required" }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Get meeting audio URL
    const { data: meeting, error: fetchErr } = await supabase
      .from("meetings")
      .select("audio_url")
      .eq("id", meetingId)
      .eq("user_id", user.id)
      .single()

    if (fetchErr || !meeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 })
    }

    // Download audio from Supabase Storage
    const { data: audioData, error: dlErr } = await supabase.storage
      .from("meeting-recordings")
      .download(meeting.audio_url)

    if (dlErr || !audioData) {
      console.error("Download error:", dlErr)
      return NextResponse.json({ error: "Audio file not found" }, { status: 404 })
    }

    const audioBuffer = Buffer.from(await audioData.arrayBuffer())

    // Detect content type from file extension
    const ext = meeting.audio_url.split(".").pop()?.toLowerCase()
    const contentTypeMap: Record<string, string> = {
      mp3: "audio/mpeg",
      wav: "audio/wav",
      m4a: "audio/x-m4a",
      mp4: "video/mp4",
    }
    const contentType = contentTypeMap[ext || ""] || "audio/mpeg"

    // Call Deepgram API with retry
const dgResponse = await withRetry(() =>
  fetch(
    "https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true",
    {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
        "Content-Type": contentType,
      },
      body: audioBuffer,
    }
  )
)

if (!dgResponse.ok) {
  const errText = await dgResponse.text()
  console.error("Deepgram error:", errText)
  return NextResponse.json(
    { error: `Transcription failed: ${errText}` },
    { status: 500 }
  )
}
    

    const dgResult = await dgResponse.json()
    const transcript =
      dgResult.results?.channels?.[0]?.alternatives?.[0]?.transcript || ""

    // Save transcript and update status
    const { error: updateErr } = await supabase
      .from("meetings")
      .update({ transcript, status: "summarising" })
      .eq("id", meetingId)
      .eq("user_id", user.id)

    if (updateErr) {
      console.error("DB update error:", updateErr)
      return NextResponse.json(
        { error: "Failed to save transcript" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, transcript })
  } catch (err) {
    console.error("Transcribe route error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}