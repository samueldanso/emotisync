import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { profiles, users, companions } from "@/lib/db/schemas"
import { Session } from "@/components/global/chat"
import { getHumeAccessToken } from "@/lib/ai/humeai"

export default async function ChatPage() {
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

  const companion = await db.query.companions.findFirst({
    where: eq(companions.id, profile.companion_avatar),
  })
  if (!companion) throw new Error("Companion not found")

  const _displayName = profile.display_name || dbUser.first_name
  const _companionName = profile.companion_name || companion.name

  // Helper for greeting based on time of day
  const _getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  // Add access token fetch
  const accessToken = await getHumeAccessToken()
  if (!accessToken) throw new Error("Failed to get Hume access token")

  return (
    <div className="-mt-12 mx-auto flex min-h-[calc(100vh-8rem)] max-w-2xl flex-col items-center justify-center px-4 md:mt-0">
      <Session
        accessToken={accessToken}
        user={dbUser}
        profile={profile}
        avatar={companion}
      />
    </div>
  )
}
