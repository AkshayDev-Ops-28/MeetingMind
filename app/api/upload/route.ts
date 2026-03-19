import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file size (50MB limit for Supabase free tier)
    const MAX_SIZE = 50 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large. Max 50MB on free tier." }, { status: 413 })
    }

    const fileName = `${Date.now()}-${file.name}`
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from("meeting-recordings")
      .upload(`public/${fileName}`, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      })

    if (storageError) {
      console.error("Storage error:", storageError)
      return NextResponse.json({ error: "Upload to storage failed" }, { status: 500 })
    }

    // Create meeting row
    const { data: meeting, error: dbError } = await supabase
      .from("meetings")
      .insert({
        title: file.name.replace(/\.[^/.]+$/, ""),
        audio_url: storageData.path,
        status: "uploading",
      })
      .select("id")
      .single()

    if (dbError) {
      console.error("DB error:", dbError)
      return NextResponse.json({ error: "Database insert failed" }, { status: 500 })
    }

    // Update status to transcribing
    await supabase
      .from("meetings")
      .update({ status: "transcribing" })
      .eq("id", meeting.id)

    return NextResponse.json({ meetingId: meeting.id, audioPath: storageData.path })
  } catch (err) {
    console.error("Upload route error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
