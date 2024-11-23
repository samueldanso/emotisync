"use server"

import { cookies } from "next/headers"

import { env } from "@/env"
import { createServerClient } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"

// Create admin client for server-side operations
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

// Export admin functions as async
export async function getAdmin() {
  return supabase.auth.admin
}

// Make server client async
export async function supabaseServerClient() {
  const cookieStore = cookies()

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )
}

// Keep getUser as async
export async function getUser() {
  const supabase = await supabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
