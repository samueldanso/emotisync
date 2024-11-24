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
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AppSidebar />
      <main className="flex min-h-0 flex-1 lg:pl-[260px]">
        <div className="container flex min-h-0 grow p-4 lg:p-8">
          <div className="absolute top-4 right-4">
            <UserProfileButton user={user} />
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
