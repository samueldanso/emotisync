import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Onboarding",
}

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user?.email) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      {children}
    </div>
  )
}
