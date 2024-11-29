import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import { constructMetadata } from "@/lib/config/metadata"

export const metadata = constructMetadata({
  title: "Onboarding",
  path: "/onboarding",
})

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user?.email) {
    redirect("/login")
  }

  return <div className="min-h-screen">{children}</div>
}
