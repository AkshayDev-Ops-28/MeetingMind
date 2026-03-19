import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { generateMeetingSummary } from "@/lib/claude"

export async function POST(req: NextRequest) {
  try {
    const { meetingId } = await req.json()

    if (!meetingId) {
      return NextResponse.json({ error: "Meeting ID required" }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Get transcript
    const { data: meeting, error: fetchErr } = await supabase
      .from("meetings")
      .select("transcript")
      .eq("id", meetingId)
      .single()

    if (fetchErr || !meeting?.transcript) {
      return NextResponse.json({ error: "Transcript not found" }, { status: 404 })
    }

    // Call Claude Haiku (free tier friendly)
    const rawResult = await generateMeetingSummary(meeting.transcript)

    // Parse JSON from Claude response
    let parsed
    try {
      // Claude might wrap JSON in markdown code blocks
      const jsonString = rawResult.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
      parsed = JSON.parse(jsonString)
    } catch {
      // If parsing fails, use raw text as summary
      parsed = {
        summary: rawResult,
        decisions: [],
        action_items: [],
      }
    }

    // Save results and mark as ready
    const { error: updateErr } = await supabase
      .from("meetings")
      .update({
        summary: parsed.summary,
        decisions: parsed.decisions,
        action_items: parsed.action_items,
        status: "ready",
      })
      .eq("id", meetingId)

    if (updateErr) {
      return NextResponse.json({ error: "Failed to save summary" }, { status: 500 })
    }

    return NextResponse.json({ success: true, ...parsed })
  } catch (err) {
    console.error("Summarize route error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
