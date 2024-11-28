import { NextResponse } from "next/server"
import { supabaseServerClient } from "@/lib/supabase/server"
import { createUser } from "@/actions/user"

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")
    const next = requestUrl.searchParams.get("next") ?? "/onboarding/profile"

    if (!code) {
      return NextResponse.redirect(new URL("/login?error=NoCode", request.url))
    }

    const supabase = await supabaseServerClient()

    const { error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code)
    if (exchangeError) {
      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent(exchangeError.message)}`,
          request.url,
        ),
      )
    }

    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session?.user?.email) {
      try {
        await createUser(session.user.email, session.user.id, {
          auth_provider: "google",
          first_name: session.user.user_metadata.full_name?.split(" ")[0] || "",
          last_name:
            session.user.user_metadata.full_name?.split(" ")[1] || null,
        })
      } catch (createError) {
        console.error("User creation error:", createError)
      }
    }

    return NextResponse.redirect(new URL(next, request.url))
  } catch (_error) {
    return NextResponse.redirect(
      new URL("/login?error=ServerError", request.url),
    )
  }
}
