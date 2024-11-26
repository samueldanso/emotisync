import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { profiles, users } from "@/lib/db/schemas"
import { Logo } from "@/components/ui/logo"
import { UserProfileButton } from "@/components/global/user-profile"
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
    <div className="relative flex min-h-screen flex-col">
      <AppMeshGradient />
      <header className="fixed top-0 right-0 left-0 z-50 flex h-14 items-center justify-between bg-background/95 px-4 backdrop-blur-sm">
        <Logo className="h-8 w-8" />
        <UserProfileButton user={dbUser} profile={profile} />
      </header>

      <div className="flex grow pt-14">
        <AppSidebar />
        <main className="relative w-full grow md:pl-20">{children}</main>
      </div>
    </div>
  )
}
