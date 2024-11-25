import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import Link from "next/link";
import { AuthForm } from "@/components/forms/auth/auth-form";

export default async function SignupPage() {
  const user = await getUser();
  if (user) redirect("/app/chat");

  return (
    <main className="space-y-8">
      <AuthForm />

      <div className="space-y-6">
        <p className="mx-auto max-w-sm text-center text-muted-foreground text-xs leading-relaxed">
          By continuing with Google, you acknowledge that you have read and
          agree to our{" "}
          <Link
            href="/terms"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
