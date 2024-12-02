"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { UserProfileButton } from "@/components/user-profile"
import { getHumeAccessToken } from "@/lib/ai/humeai"
import { getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { profiles } from "@/lib/db/schemas"
import { VoiceProvider } from "@/components/providers/voice-provider"
import { checkUsageLimit } from "@/actions/rate-limit"
import { Clock } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface LayoutProps {
  children: React.ReactNode
  user: any // Replace with proper type
  profile: any // Replace with proper type
  accessToken: string
  usage: { remainingSeconds: number }
}

function LayoutContent({
  children,
  user,
  profile,
  accessToken,
  usage,
}: LayoutProps) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const remainingMinutes = Math.floor(usage.remainingSeconds / 60)

  return (
    <VoiceProvider accessToken={accessToken} profile={profile}>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            isCollapsed
              ? "ml-[3.5rem] md:ml-[4rem]"
              : "ml-[16rem] md:ml-[18rem]",
          )}
        >
          <div className="absolute top-4 right-4 flex items-center gap-2 sm:top-6 sm:right-6 sm:gap-3">
            <div className="flex items-center gap-1.5 rounded-full border bg-card px-2 py-1 text-xs sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
              <Clock className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" />
              <span>{remainingMinutes}m</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border bg-card/50 px-2 py-1 text-muted-foreground text-xs sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
              <span>2,524</span>
              <span className="text-[10px] sm:text-xs">pts</span>
            </div>
            <UserProfileButton user={user} profile={profile} />
          </div>
          <div className="flex min-h-screen items-center justify-center p-4">
            {children}
          </div>
        </main>
      </div>
    </VoiceProvider>
  )
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  if (!user) redirect("/login")

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  })
  if (!profile?.onboarding_completed) redirect("/profile")

  const accessToken = await getHumeAccessToken()
  if (!accessToken) throw new Error("Failed to get Hume access token")

  const usage = await checkUsageLimit()

  const mappedUser = {
    id: user.id,
    name: user.user_metadata?.name || user.email?.split("@")[0] || "",
    email: user.email || "",
    first_name: user.user_metadata?.first_name || "",
    last_name: user.user_metadata?.last_name || null,
    created_at: user.created_at ? new Date(user.created_at) : null,
    updated_at: user.updated_at ? new Date(user.updated_at) : null,
  }

  return (
    <LayoutContent
      user={mappedUser}
      profile={profile}
      accessToken={accessToken}
      usage={usage}
    >
      {children}
    </LayoutContent>
  )
}
