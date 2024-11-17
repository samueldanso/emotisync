import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import Link from "next/link"
import { AuthForm } from "../auth-form"

export default async function SignupPage() {
  const user = await getUser()
  if (user) redirect("/app")

  return (
    <main className="space-y-6">
      <h2 className="text-center font-semibold text-xl tracking-tight">
        Sign up for an account
      </h2>

      <AuthForm user={user} />

      <div className="space-y-4">
        <p className="text-center text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Log in
          </Link>
        </p>

        <p className="text-center text-muted-foreground text-xs">
          By continuing with Google, you acknowledge that you have read and
          agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
