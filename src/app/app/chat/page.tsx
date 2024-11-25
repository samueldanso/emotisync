import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { profiles, users, companions } from "@/lib/db/schemas"
import { StartCall } from "@/components/global/start-call"
import { AvatarCard } from "@/components/ui/avatar-card"

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
  const companionName = profile.companion_name || companion.name

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-2xl flex-col items-center px-4 pt-12 md:pt-16">
      {/* Greeting Section */}
      <div className="mb-12 w-full text-center">
        <h1 className="mb-2 font-semibold text-3xl tracking-tight">
          Hi! I'm {companionName}
        </h1>
        <p className="text-muted-foreground">
          I'm your personal AI companion. How are you feeling today?
        </p>
      </div>

      {/* Avatar Card */}
      <div className="mb-12 w-full">
        <AvatarCard
          imageUrl={companion.image_url}
          name={companionName}
          description="Click to start talking"
        />
      </div>

      {/* Start Button */}
      <StartCall />
    </div>
  )
}
