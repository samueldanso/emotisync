import dynamic from "next/dynamic"
import { getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { profiles, companions } from "@/lib/db/schemas"
import type { Profile } from "@/lib/db/schemas/profiles"
import type { Companion } from "@/lib/db/schemas/companions"
import type { User } from "@/lib/db/schemas/users"

interface ChatProps {
  user: User
  profile: Profile
  avatar: Companion
}

const Chat = dynamic<ChatProps>(() => import("@/components/chat"), {
  ssr: false,
})

export default async function ChatPage() {
  const user = await getUser()
  if (!user) redirect("/login")

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  })
  if (!profile?.onboarding_completed) redirect("/profile")

  const avatar = await db.query.companions.findFirst({
    where: eq(companions.id, profile.companion_avatar),
  })
  if (!avatar) redirect("/profile")

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
    auth_provider: (user.app_metadata?.provider || "google") as
      | "google"
      | "telegram",
    telegram_id: user.user_metadata?.telegram_id || null,
    created_at: user.created_at ? new Date(user.created_at) : null,
    updated_at: user.updated_at ? new Date(user.updated_at) : null,
  }

  return <Chat user={mappedUser} profile={profile} avatar={avatar} />
}
