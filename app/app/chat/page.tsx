import dynamic from "next/dynamic"
import { getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { profiles, type Profile } from "@/lib/db/schemas"
import { companions, type Companion } from "@/lib/db/schemas"
import { users, type User } from "@/lib/db/schemas"

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

  if (!user?.email) {
    redirect("/login")
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  })

  if (!profile?.onboarding_completed) {
    redirect("/welcome/profile")
  }

  const avatar = await db.query.companions.findFirst({
    where: eq(companions.id, profile.companion_avatar),
  })

  if (!avatar) {
    throw new Error("No avatar found")
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  })

  if (!dbUser) {
    throw new Error("User not found")
  }

  return (
    <div className="flex min-h-0 grow flex-col">
      <Chat user={dbUser} profile={profile} avatar={avatar} />
    </div>
  )
}
