import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { profiles, users, companions } from "@/lib/db/schemas"
import Session from "@/components/global/chat"
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

  const accessToken = await getHumeAccessToken()
  if (!accessToken) {
    throw new Error("Failed to get Hume access token")
  }

  return (
    <div className="fixed inset-0 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="relative h-full">
        <Session
          accessToken={accessToken}
          user={dbUser}
          profile={profile}
          avatar={companion}
        />
      </div>
    </div>
  )
}
