import { getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { profiles, avatars } from "@/db/schemas"
import Link from "next/link"
import Image from "next/image"
import { getGreeting } from "@/lib/utils"

export default async function HomePage() {
  const user = await getUser()
  if (!user) redirect("/login")

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  })
  if (!profile) redirect("/welcome/profile")

  const avatar = await db.query.avatars.findFirst({
    where: eq(avatars.id, profile.companion_avatar),
  })
  if (!avatar) throw new Error("Avatar not found")

  const displayName = profile?.display_name || user.first_name

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      {/* AI Avatar */}
      <div className="mb-8">
        <Image
          src={avatar.image_url}
          alt={avatar.name}
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>

      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <h2 className="mb-2 font-semibold text-2xl">
          {`${getGreeting()}, ${displayName}`}
        </h2>
        <p className="text-muted-foreground">
          I'm {avatar.name}, your AI companion
        </p>
        <p className="mt-2 text-muted-foreground text-sm">
          Ready to start a conversation?
        </p>
      </div>

      {/* Start Button */}
      <Link
        href="/app/chat"
        className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground text-sm shadow-lg transition-colors hover:bg-primary/90"
      >
        Start Conversation
      </Link>
    </div>
  )
}
