import { useState, useCallback } from "react"
import { createClient } from "@/lib/supabase"

export interface Meeting {
  id: string
  title: string
  duration_seconds: number | null
  audio_url: string | null
  status: "uploading" | "transcribing" | "summarising" | "ready"
  created_at: string
}

export function useMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const fetchMeetings = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('meetings')
        .select('id, title, duration_seconds, audio_url, status, created_at')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setMeetings(data || [])
    } catch (err) {
      console.error("Error fetching meetings:", err)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const fetchMeetingById = useCallback(async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    } catch (err) {
      console.error(`Error fetching meeting ${id}:`, err)
      return null
    }
  }, [supabase])

  return { meetings, loading, fetchMeetings, fetchMeetingById }
}
