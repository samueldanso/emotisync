import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";
import { getPlatform } from "./lib/utils/platform";

export async function middleware(request: NextRequest) {
  const platform = getPlatform();
  const pathname = request.nextUrl.pathname;

  // Handle Telegram platform redirects first
  if (platform === "telegram") {
    // Redirect marketing and auth pages to app for Telegram users
    if (
      pathname === "/" ||
      pathname.startsWith("/privacy") ||
      pathname.startsWith("/terms") ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup")
    ) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    // For protected routes in Telegram, let the page handle auth
    if (
      pathname.startsWith("/profile") ||
      pathname.startsWith("/chat") ||
      pathname.startsWith("/journal") ||
      pathname.startsWith("/insights") ||
      pathname.startsWith("/recommendations")
    ) {
      return NextResponse.next();
    }
  }

  // Add platform check to preserve web routes
  if (platform === "web" || !platform) {
    return await updateSession(request);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
