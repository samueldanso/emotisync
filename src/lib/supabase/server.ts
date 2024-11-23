"use server"

import { cookies } from "next/headers"

import { env } from "@/env"
import { createServerClient } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

export const supabaseAdmin = supabase.auth.admin

export async function supabaseServerClient() {
  const cookieStore = cookies()

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set(name, value, options)
          } catch {
            // Handle cookies in middleware
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set(name, "", { ...options, maxAge: 0 })
          } catch {
            // Handle cookies in middleware
          }
        },
      },
    },
  )

  return supabase
}

export async function getUser() {
  const supabase = await supabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}
