// lib/auth-helpers.ts
import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

export async function verifyAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return { user: null, error: 'Missing token' }
  }

  const token = authHeader.split(' ')[1]

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return { user: null, error: 'Invalid token' }
  }

  return { user, error: null }
}