import { NextResponse } from "next/server"
import { supabaseServerClient } from "@/lib/supabase/server"
import { createUser } from "@/actions/users"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") ?? "/welcome/profile"

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 })
    }

    const supabase = await supabaseServerClient()
    const {
      data: { session },
      error,
    } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(
        new URL(
          `/signup?error=${encodeURIComponent(error.message)}`,
          request.url,
        ),
      )
    }

    if (session?.user?.email) {
      await createUser(session.user.email, session.user.id, {
        auth_provider: "google",
        first_name: session.user.user_metadata.full_name?.split(" ")[0] || "",
        last_name: session.user.user_metadata.full_name?.split(" ")[1] || null,
      })
    } else {
      return NextResponse.redirect(
        new URL("/signup?error=NoUserEmail", request.url),
      )
    }

    return NextResponse.redirect(new URL(next, request.url))
  } catch (_error) {
    return NextResponse.redirect(
      new URL("/signup?error=ServerError", request.url),
    )
  }
}
