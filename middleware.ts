import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "./lib/supabase/middleware"
import { getPlatform } from "./lib/utils/platform"

export async function middleware(request: NextRequest) {
  const platform = getPlatform()
  const pathname = request.nextUrl.pathname

  // Handle Telegram platform redirects first
  if (platform === "telegram") {
    // If Telegram user, redirect to mini-app
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/mini-app", request.url))
    }
  } else {
    // If web user, show marketing page
    return await updateSession(request)
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
