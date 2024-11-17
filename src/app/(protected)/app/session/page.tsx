import { getHumeAccessToken } from "@/lib/ai/humeai"
import dynamic from "next/dynamic"

interface SessionProps {
  accessToken: string
}

const Session = dynamic<SessionProps>(() => import("./_components/session"), {
  ssr: false,
})

export default async function SessionPage() {
  const accessToken = await getHumeAccessToken()

  if (!accessToken) {
    throw new Error("No access token available")
  }

  return (
    <div className={"flex grow flex-col"}>
      <Session accessToken={accessToken} />
    </div>
  )
}
