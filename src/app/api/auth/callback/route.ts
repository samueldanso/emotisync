import { NextResponse } from "next/server"
import { supabaseServerClient } from "@/lib/supabase/server"
import { createUser } from "@/actions/users"

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")
    const origin = requestUrl.origin
    const next = requestUrl.searchParams.get("next") ?? "/welcome/profile"

    if (!code) {
      return NextResponse.redirect(`${origin}/signup?error=NoCode`)
    }

    const supabase = await supabaseServerClient()

    const { error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code)
    if (exchangeError) {
      return NextResponse.redirect(
        `${origin}/signup?error=${encodeURIComponent(exchangeError.message)}`,
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

    return NextResponse.redirect(`${origin}${next}`)
  } catch (_error) {
    return NextResponse.redirect(`${origin}/signup?error=ServerError`)
  }
}
