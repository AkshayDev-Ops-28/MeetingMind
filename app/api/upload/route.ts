import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: NextRequest) {
  try {
    // Service role key — server only, never exposed to browser
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file size (50MB limit)
    const MAX_SIZE = 50 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max 50MB." },
        { status: 413 }
      )
    }

    // Get authenticated user from session header
    const authHeader = req.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    // Decode JWT locally — no network call needed
let user: { id: string } | null = null
try {
  const base64Payload = token.split('.')[1]
  const payload = JSON.parse(
    Buffer.from(base64Payload, 'base64').toString('utf8')
  )
  if (payload.sub && payload.exp > Date.now() / 1000) {
    user = { id: payload.sub }
  }
} catch {
  user = null
}

if (!user) {
  return NextResponse.json({ error: "Invalid session" }, { status: 401 })
}


    // Upload file to Supabase Storage
    const fileName = `${user.id}/${Date.now()}-${file.name}`
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data: storageData, error: storageError } = await supabase.storage
      .from("meeting-recordings")
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      })

    if (storageError) {
      console.error("Storage error:", storageError)
      return NextResponse.json(
        { error: "Upload to storage failed" },
        { status: 500 }
      )
    }

    // Create meeting row linked to the authenticated user
    const { data: meeting, error: dbError } = await supabase
      .from("meetings")
      .insert({
        user_id: user.id,
        title: file.name.replace(/\.[^/.]+$/, ""),
        audio_url: storageData.path,
        status: "uploading",
      })
      .select("id")
      .single()

    if (dbError) {
      console.error("DB error:", dbError)
      return NextResponse.json(
        { error: "Database insert failed" },
        { status: 500 }
      )
    }

    // Update status to transcribing
    await supabase
      .from("meetings")
      .update({ status: "transcribing" })
      .eq("id", meeting.id)

    return NextResponse.json({
      meetingId: meeting.id,
      audioPath: storageData.path,
    })
  } catch (err) {
    console.error("Upload route error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}