import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { profiles, users, avatars } from "@/db/schemas"
import Session from "@/app/app/_components/chat"
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

  const avatar = await db.query.avatars.findFirst({
    where: eq(avatars.id, profile.companion_avatar),
  })
  if (!avatar) throw new Error("Avatar not found")

  const accessToken = await getHumeAccessToken()
  if (!accessToken) {
    throw new Error("Failed to get Hume access token")
  }

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col">
      <Session
        accessToken={accessToken}
        user={dbUser}
        profile={profile}
        avatar={avatar}
      />
    </div>
  )
}
