import { getHumeAccessToken } from "@/lib/ai/humeai"
import dynamic from "next/dynamic"
import { getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { profiles } from "@/db/schemas"

interface SessionProps {
  accessToken: string
  profile: {
    companion_name: string
    companion_avatar: string
  }
}

const Session = dynamic<SessionProps>(
  () => import("./_components/session/session"),
  {
    ssr: false,
  },
)

export default async function AppPage() {
  const user = await getUser()

  if (!user?.email) {
    redirect("/login")
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  })

  if (!profile?.onboarding_completed) {
    redirect("/welcome")
  }

  const accessToken = await getHumeAccessToken()

  if (!accessToken) {
    throw new Error("No access token available")
  }

  return (
    <div className="flex min-h-0 grow flex-col">
      <Session
        accessToken={accessToken}
        profile={{
          companion_name: profile.companion_name,
          companion_avatar: profile.companion_avatar,
        }}
      />
    </div>
  )
}
