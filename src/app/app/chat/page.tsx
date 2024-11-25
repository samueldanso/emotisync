import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { profiles, users, companions } from "@/lib/db/schemas"
import Session from "@/components/global/chat"
import { getHumeAccessToken } from "@/lib/ai/humeai"

export default async function AppPage() {
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

  const displayName = profile.display_name || dbUser.name

  // Get time-based greeting
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="fixed inset-0 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      {/* Welcome Section */}
      <div className="relative px-4 pt-8 md:px-6">
        <div className="mb-12 text-left">
          <h1 className="mb-2 font-heading font-semibold text-3xl tracking-tight">
            {`${greeting}, ${displayName}`}
          </h1>
          <p className="text-muted-foreground">How are you feeling today?</p>
        </div>
      </div>

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
