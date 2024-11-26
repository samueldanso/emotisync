import { getHumeAccessToken } from "@/lib/ai/humeai"
import { redirect } from "next/navigation"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { companions } from "@/lib/db/schemas"
import dynamic from "next/dynamic"

const Chat = dynamic(() => import("@/components/global/chat"), {
  ssr: false,
})

export default async function Page() {
  const accessToken = await getHumeAccessToken()
  if (!accessToken) {
    throw new Error()
  }

  // Get companion data for avatar
  const profile = await db.query.profiles.findFirst()
  if (!profile) redirect("/welcome/profile")

  const companion = await db.query.companions.findFirst({
    where: eq(companions.id, profile.companion_avatar),
  })
  if (!companion) throw new Error("Companion not found")

  return (
    <div className="flex grow flex-col">
      <Chat
        accessToken={accessToken}
        avatar={{
          image_url: companion.image_url,
          name: companion.name,
        }}
      />
    </div>
  )
}
