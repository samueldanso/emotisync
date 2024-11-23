"use server"

import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export async function getUser() {
  const _cookieStore = cookies()
  const supabase = createServerClient(/* ... */)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
