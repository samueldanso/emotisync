import { redirect } from "next/navigation"
import { AuthForm } from "../auth-form"
import { getUser } from "@/lib/supabase/server"
import Link from "next/link"

export default async function LoginPage() {
  const user = await getUser()
  if (user) redirect("/app")

  return (
    <main className="space-y-6">
      <h2 className="text-center font-semibold text-xl tracking-tight">
        Log in to your account
      </h2>

      <AuthForm user={user} />

      <p className="text-center text-muted-foreground text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign up
        </Link>
      </p>
    </main>
  )
}
