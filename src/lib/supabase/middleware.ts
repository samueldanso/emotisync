import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { env } from "@/env"

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request,
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove: (name) => {
          request.cookies.delete(name)
          response = NextResponse.next({
            request,
          })
          response.cookies.delete(name)
        },
      },
    },
  )

  // IMPORTANT: Get user immediately after client creation
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Handle auth redirects with platform awareness
  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/signup") &&
    !request.nextUrl.pathname.startsWith("/auth") &&
    // Don't redirect Telegram paths
    !request.nextUrl.pathname.startsWith("/api/telegram")
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return response
}
