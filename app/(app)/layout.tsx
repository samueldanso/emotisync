import { AppSidebar } from "@/components/app-sidebar"
import { AppMobileSidebar } from "@/components/app-mobile-sidebar"
import { UserProfileButton } from "@/components/user-profile"
import { getHumeAccessToken } from "@/lib/ai/humeai"
import { getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { profiles } from "@/lib/db/schemas"
import { VoiceProvider } from "@/components/providers/voice-provider"
import { checkUsageLimit } from "@/actions/rate-limit"
import { SidebarProvider } from "@/components/ui/sidebar"
import { UsageDisplay } from "@/components/usage-display"

interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const user = await getUser()
  if (!user) redirect("/login")

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  })
  if (!profile?.onboarding_completed) redirect("/profile")

  const accessToken = await getHumeAccessToken()
  if (!accessToken) throw new Error("Failed to get Hume access token")

  const usage = await checkUsageLimit()
  const remainingMinutes = Math.floor(usage.remainingSeconds / 60)
  const points = 2524

  const mappedUser = {
    id: user.id,
    name: user.user_metadata?.name || user.email?.split("@")[0] || "",
    email: user.email || "",
    first_name:
      user.user_metadata?.full_name?.split(" ")[0] ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "",
    last_name: user.user_metadata?.last_name || null,
    created_at: user.created_at ? new Date(user.created_at) : null,
    updated_at: user.updated_at ? new Date(user.updated_at) : null,
  }

  return (
    <SidebarProvider>
      <VoiceProvider accessToken={accessToken} profile={profile}>
        <div className="flex h-screen w-full overflow-hidden">
          <div className="md:hidden">
            <AppMobileSidebar />
          </div>
          <div className="hidden md:block">
            <AppSidebar />
          </div>
          <main className="relative flex-1 transition-all duration-300 ease-in-out">
            <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
              <UsageDisplay
                remainingMinutes={remainingMinutes}
                points={points}
              />
              <UserProfileButton user={mappedUser} profile={profile} />
            </div>
            <div className="h-full w-full p-6">{children}</div>
          </main>
        </div>
      </VoiceProvider>
    </SidebarProvider>
  )
}
