import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { profiles, users } from "@/lib/db/schemas"
import { Logo } from "@/components/ui/logo"
import { UserProfileButton } from "@/components/global/user-profile"
import { AppSidebar } from "@/components/global/sidebar"

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
    <div className="flex min-h-screen flex-col">
      <div className="flex h-14 items-center px-4">
        <Logo className="h-8 w-8" />
        <div className="ml-auto">
          <UserProfileButton user={dbUser} profile={profile} />
        </div>
      </div>

      <div className="flex grow">
        <AppSidebar />
        <main className="grow">{children}</main>
      </div>
    </div>
  )
}
