import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import { AppSidebar } from "../../components/global/sidebar"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { profiles, users } from "@/lib/db/schemas"
import { UserProfileButton } from "../../components/global/user-profile"
import { Logo } from "@/components/ui/logo"

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
    <div className="relative min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="absolute inset-0 bg-gradient-to-br from-[#6842d8]/5 via-[#9064d5]/5 to-[#f4b1c8]/5" />

      <header className="fixed top-0 right-0 left-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <Logo className="h-8 w-8" />
          <UserProfileButton user={user} profile={profile} />
        </div>
      </header>

      <main className="container relative pt-16 pb-16 md:pl-20">
        <div className="relative mx-auto max-w-5xl">{children}</div>
      </main>

      <AppSidebar />
    </div>
  )
}
