import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { env } from "@/env"

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set({ name, value, ...options })
            response.cookies.set({ name, value, ...options })
          })
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 1. Public marketing pages - always accessible
  if (
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/privacy") ||
    request.nextUrl.pathname.startsWith("/terms")
  ) {
    return response
  }

  // 2. Auth pages - redirect to /app if already logged in
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup")
  ) {
    if (user) {
      return NextResponse.redirect(new URL("/app/chat", request.url))
    }
    return response
  }

  // 3. Protected routes - require authentication
  if (
    request.nextUrl.pathname.startsWith("/welcome") ||
    request.nextUrl.pathname.startsWith("/app")
  ) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return response
}
