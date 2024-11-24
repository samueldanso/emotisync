import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import { AppSidebar } from "./_components/sidebar"
import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { profiles, users } from "@/db/schemas"
import { UserProfileButton } from "./_components/user-profile-button"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabaseUser = await getUser()

  if (!supabaseUser?.email) {
    redirect("/login")
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, supabaseUser.id),
  })

  if (!user) {
    redirect("/login")
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  })

  if (!profile?.onboarding_completed) {
    redirect("/welcome/profile")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppSidebar />
      <main className="flex min-h-0 grow flex-col pb-14 lg:pb-0 lg:pl-[80px]">
        <div className="container relative flex min-h-0 grow p-4 lg:p-6">
          <div className="absolute top-6 right-6 z-40">
            <UserProfileButton user={user} profile={profile} />
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
