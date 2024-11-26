"use client"

import { VoiceProvider, type Message } from "@humeai/voice-react"
import dynamic from "next/dynamic"
import { useRef, useState } from "react"
import { env } from "@/env"
import { AvatarStatus } from "./avatar-status"
import { ChatRadialGradient } from "@/components/ui/app-gradient"
import type { User } from "@/lib/db/schemas/users"
import type { Profile } from "@/lib/db/schemas/profiles"

// Dynamic imports following starter kit
const Messages = dynamic(() => import("./messages"))
const Controls = dynamic(() => import("./controls"))
const StartCall = dynamic(() =>
  import("./start-call").then((mod) => mod.StartCall),
)

interface ChatProps {
  accessToken: string
  user: User
  profile: Profile
  avatar: {
    image_url: string
    name: string
  }
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

export default function Chat({
  accessToken,
  user,
  profile,
  avatar,
}: ChatProps) {
  const timeout = useRef<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const displayName = profile?.display_name || user.first_name
  const companionName = avatar.name

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col overflow-hidden">
      <ChatRadialGradient />
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={env.NEXT_PUBLIC_HUME_CONFIG_ID}
        onMessage={(msg: Message) => {
          if (timeout.current) {
            window.clearTimeout(timeout.current)
          }

          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              ref.current.scrollTo({
                top: ref.current.scrollHeight,
                behavior: "smooth",
              })
            }
          }, 200)

          if (msg.type === "assistant_message") {
            setIsSpeaking(true)
            setTimeout(() => setIsSpeaking(false), 2000)
          }
        }}
      >
        <div className="relative z-20 flex flex-col items-center py-6 md:py-8">
          <AvatarStatus
            avatar={avatar.image_url}
            name={companionName}
            isSpeaking={isSpeaking}
          />
          <div className="mt-4 text-center">
            <h1 className="font-semibold text-xl md:text-2xl">
              {getGreeting()}, {displayName}
            </h1>
            <p className="mt-1.5 text-base text-muted-foreground">
              I'm {companionName}, your personal companion. What would you like
              to talk about today?
            </p>
          </div>
        </div>

        <div className="relative z-10 mx-auto h-full w-full max-w-3xl px-4 pb-32">
          <Messages ref={ref} />
        </div>

        <Controls />
        <StartCall />
      </VoiceProvider>
    </div>
  )
}
