"use server"

import { noStore } from "@/lib/utils/server"
import { NextResponse } from "next/server"
import { supabaseServerClient } from "@/lib/supabase/server"

import { checkOnboardingStatus } from "@/actions/profiles"
import { createUser } from "@/actions/users"

export async function GET(request: Request) {
  noStore()
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  console.log("Auth callback started with code:", code)

  if (!code) {
    console.log("No code provided, redirecting to login")
    return NextResponse.redirect(`${requestUrl.origin}/login`)
  }

  try {
    const supabase = supabaseServerClient()
    console.log("Exchanging code for session...")

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.exchangeCodeForSession(code)

    console.log("Session result:", { session: !!session, error: sessionError })

    if (sessionError || !session?.user?.email || !session?.user?.id) {
      console.log("Session error or missing user data:", { sessionError })
      return NextResponse.redirect(`${requestUrl.origin}/login`)
    }

    const { email, id, user_metadata } = session.user

    await createUser(email, id, {
      auth_provider: "google",
      first_name:
        user_metadata.given_name ||
        user_metadata.name?.split(" ")[0] ||
        email.split("@")[0],
      last_name:
        user_metadata.family_name ||
        user_metadata.name?.split(" ").slice(1).join(" ") ||
        null,
    })

    const { isOnboarded, error: profileError } = await checkOnboardingStatus(
      session.user.id,
    )

    console.log("Profile check result:", { isOnboarded, error: profileError })

    if (profileError) {
      console.log("Profile error:", profileError)
      return NextResponse.redirect(`${requestUrl.origin}/welcome/profile`)
    }

    console.log(
      "Auth flow completed, redirecting to:",
      isOnboarded ? "/app" : "/welcome/profile",
    )

    return NextResponse.redirect(
      `${requestUrl.origin}${isOnboarded ? "/app" : "/welcome/profile"}`,
    )
  } catch (error) {
    console.error("Unexpected error in auth callback:", error)
    return NextResponse.redirect(`${requestUrl.origin}/login`)
  }
}
