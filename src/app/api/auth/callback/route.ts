"use server"

import { unstable_noStore as noStore } from "next/cache"
import { NextResponse } from "next/server"
import { supabaseServerClient } from "@/lib/supabase/server"

import { checkOnboardingStatus } from "@/actions/profiles"
import { createUser } from "@/app/(auth)/actions"

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

    const { error: userError } = await createUser(
      session.user.email,
      session.user.id,
    )

    console.log("User creation result:", { error: userError })

    if (userError) {
      console.log("User creation error:", userError)
      return NextResponse.redirect(`${requestUrl.origin}/login`)
    }

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
