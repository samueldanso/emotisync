"use server";

import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabase/server";
import { createUser } from "@/actions/users";
import { checkOnboardingStatus } from "@/actions/profiles";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    try {
      const supabase = await supabaseServerClient();

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.exchangeCodeForSession(code);

      console.log("Session result:", {
        session: !!session,
        error: sessionError,
      });

      if (sessionError || !session?.user?.email || !session?.user?.id) {
        console.log("Session error or missing user data:", { sessionError });
        return NextResponse.redirect(`${requestUrl.origin}/login`);
      }

      const { email, id, user_metadata } = session.user;

      const firstName =
        user_metadata.given_name ||
        user_metadata.name?.split(" ")[0] ||
        email.split("@")[0].replace(/[0-9]/g, "");

      const lastName =
        user_metadata.family_name ||
        (user_metadata.name?.split(" ").length > 1
          ? user_metadata.name?.split(" ").slice(1).join(" ")
          : null);

      await createUser(email, id, {
        auth_provider: "google",
        first_name: firstName,
        last_name: lastName,
      });

      const { isOnboarded, error: profileError } = await checkOnboardingStatus(
        session.user.id
      );

      console.log("Profile check result:", {
        isOnboarded,
        error: profileError,
      });

      if (profileError) {
        console.log("Profile error:", profileError);
        return NextResponse.redirect(`${requestUrl.origin}/welcome/profile`);
      }

      console.log(
        "Auth flow completed, redirecting to:",
        isOnboarded ? "/app" : "/welcome/profile"
      );

      return NextResponse.redirect(
        `${requestUrl.origin}${isOnboarded ? "/app" : "/welcome/profile"}`
      );
    } catch (error) {
      console.error("Error:", error);
      return new Response(null, {
        status: 500,
      });
    }
  }

  return NextResponse.redirect(requestUrl.origin);
}
