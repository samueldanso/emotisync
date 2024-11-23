import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabase/server";
import { createUser } from "@/actions/users";

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

      if (session?.user) {
        await createUser(session.user.email!, session.user.id, {
          auth_provider: "google",
          first_name: session.user.user_metadata.full_name?.split(" ")[0] || "",
          last_name:
            session.user.user_metadata.full_name?.split(" ")[1] || null,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      return new Response(null, {
        status: 500,
      });
    }
  }

  return NextResponse.redirect(requestUrl.origin);
}
