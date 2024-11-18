import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"

export default async function WelcomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user?.email) {
    redirect("/login")
  }
  // refactor onboadrding page to look like reads
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-purple-50 p-4">
      {children}
    </div>
  )
}
