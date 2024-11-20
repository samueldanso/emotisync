import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res: response })
  const {
    data: { session: supabaseSession },
  } = await supabase.auth.getSession()

  // Check for Telegram auth token
  const telegramToken = request.cookies.get("access_token")

  // Protected routes pattern
  const protectedRoutes = ["/app", "/welcome"]
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  )

  if (isProtectedRoute) {
    // Allow access if either auth method is valid
    if (!supabaseSession && !telegramToken) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes that handle their own auth
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api/telegram).*)",
  ],
}
