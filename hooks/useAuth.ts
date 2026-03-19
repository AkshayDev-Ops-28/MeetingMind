import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"

export function useAuth() {
  const [user, setUser] = useState<{ id: string, email?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  return {
    user,
    loading,
    signOut: () => supabase.auth.signOut(),
  }
}
