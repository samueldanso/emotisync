import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { profiles, users } from "@/lib/db/schemas"
import { AppHeader } from "@/components/global/app-header"
import { AppSidebar } from "@/components/global/sidebar"
import { AppMeshGradient } from "@/components/ui/app-gradient"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabaseUser = await getUser()
  if (!supabaseUser) redirect("/login")

  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, supabaseUser.id),
  })
  if (!dbUser) redirect("/login")

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, dbUser.id),
  })
  if (!profile) redirect("/welcome/profile")

  return (
    <div className="relative min-h-screen bg-background">
      <AppMeshGradient />
      <AppHeader user={dbUser} profile={profile} />
      <main className="relative mx-auto max-w-5xl px-4 pt-24 pb-20 md:px-8 md:pl-32">
        {children}
      </main>
      <AppSidebar />
    </div>
  )
}
