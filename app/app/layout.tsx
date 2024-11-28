import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { profiles, users } from "@/lib/db/schemas"
import { VoiceProvider } from "@/components/providers/voice-provider"
import { getHumeAccessToken } from "@/lib/ai/humeai"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { UserProfileButton } from "@/components/user-profile"

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

  const accessToken = await getHumeAccessToken()
  if (!accessToken) {
    throw new Error("No access token available")
  }

  return (
    <VoiceProvider accessToken={accessToken}>
      <SidebarProvider defaultOpen={false}>
        <div className="relative flex min-h-screen">
          <div className="hidden [&:not([data-in-call=true])]:block">
            <AppSidebar />
          </div>

          <main className="flex-1">
            <div className="relative min-h-screen w-full bg-background">
              <header className="fixed top-0 z-20 hidden h-12 w-full items-center justify-end px-4 md:px-6 [&:not([data-in-call=true])]:flex">
                <UserProfileButton user={dbUser} profile={profile} />
              </header>
              <div className="container relative mx-auto flex min-h-screen flex-col items-center px-4 pt-20 md:px-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </VoiceProvider>
  )
}
