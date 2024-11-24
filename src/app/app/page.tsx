import { getHumeAccessToken } from "@/lib/ai/humeai"
import dynamic from "next/dynamic"
import { getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { profiles, type Profile } from "@/db/schemas/profiles"
import { avatars, type Avatar } from "@/db/schemas/avatars"
import { users, type User } from "@/db/schemas/users"

interface ChatProps {
  accessToken: string
  user: User
  profile: Profile
  avatar: Avatar
}

const Chat = dynamic<ChatProps>(() => import("./_components/chat"), {
  ssr: false,
})

export default async function AppPage() {
  const user = await getUser()

  if (!user?.email) {
    redirect("/login")
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  })

  if (!profile?.onboarding_completed) {
    redirect("/welcome/profile")
  }

  const avatar = await db.query.avatars.findFirst({
    where: eq(avatars.id, profile.companion_avatar),
  })

  if (!avatar) {
    throw new Error("No avatar found")
  }

  const accessToken = await getHumeAccessToken()

  if (!accessToken) {
    throw new Error("No access token available")
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  })

  if (!dbUser) {
    throw new Error("User not found")
  }

  return (
    <div className="flex min-h-0 grow flex-col">
      <Chat
        accessToken={accessToken}
        user={dbUser}
        profile={profile}
        avatar={avatar}
      />
    </div>
  )
}
