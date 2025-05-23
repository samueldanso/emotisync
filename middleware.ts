import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // For testing, allow direct access to /mini-app
  if (pathname.startsWith("/mini-app")) {
    return NextResponse.next()
  }

  // More precise Telegram WebApp detection
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || ""
  const initData = request.headers.get("x-initdata")
  const isTelegramWebApp =
    userAgent.includes("telegram") ||
    request.nextUrl.searchParams.has("tgWebAppData") ||
    request.cookies.has("telegram_webapp") ||
    !!initData

  // Debug logging
  console.log("Middleware Debug:", {
    pathname,
    userAgent,
    initData: !!initData,
    searchParams: request.nextUrl.searchParams.toString(),
    cookies: request.cookies.toString(),
    isTelegramWebApp,
  })

  // Initialize response
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
    if (isTelegramWebApp) {
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
    // Auth routes
    "/login/:path*",
    "/register/:path*",
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
    "/mini-app",
    "/mini-app/:path*",
    // Catch partial paths
    "/mini:path*",
  ],
}
