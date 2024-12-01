import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isTelegramRequest =
    request.headers.get("user-agent")?.toLowerCase().includes("telegram") ||
    request.nextUrl.searchParams.has("tgWebAppData")

  // Handle Telegram users
  if (isTelegramRequest) {
    // If not authenticated and not on /mini-app, redirect to /mini-app
    if (!pathname.startsWith("/mini-app")) {
      const accessToken = request.cookies.get("capx_access_token")?.value

      // If no token, redirect to /mini-app for auth
      if (!accessToken) {
        const miniAppUrl = new URL("/mini-app", request.url)
        miniAppUrl.search = request.nextUrl.search
        return NextResponse.redirect(miniAppUrl)
      }
    }

    // Once authenticated, allow access to all app routes
    return NextResponse.next()
  }

  // Handle Web Users (prevent access to /mini-app)
  if (!isTelegramRequest && pathname.startsWith("/mini-app")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Initialize response and Supabase client
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 1. Public marketing pages - always accessible
  if (
    pathname === "/" ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/terms")
  ) {
    return response
  }

  // 2. Protected routes - require authentication
  if (
    pathname.startsWith("/profile") ||
    pathname.startsWith("/companion") ||
    pathname.startsWith("/chat") ||
    pathname.startsWith("/journal") ||
    pathname.startsWith("/insights") ||
    pathname.startsWith("/recommendations") ||
    pathname.startsWith("/settings")
  ) {
    // For Telegram users, check CapX token
    if (isTelegramRequest) {
      const accessToken = request.cookies.get("capx_access_token")?.value
      if (!accessToken) {
        return NextResponse.redirect(new URL("/mini-app", request.url))
      }
      return response
    }
  }

  return response
}

export const config = {
  matcher: [
    // Public routes
    "/",
    "/privacy/:path*",
    "/terms/:path*",
    // App routes
    "/profile/:path*",
    "/companion/:path*",
    "/chat/:path*",
    "/journal/:path*",
    "/insights/:path*",
    "/recommendations/:path*",
    "/settings/:path*",
    // Mini app routes
    "/mini-app/:path*",
  ],
}
