"use client"

import { VoiceProvider, useVoice } from "@humeai/voice-react"
import Messages from "./messages"
import Controls from "./controls"
import { StartCall } from "./start-call"
import { type ComponentRef, useRef, useState } from "react"
import { env } from "@/env"
import { AvatarStatus } from "./avatar-status"
import { ChatRadialGradient } from "@/components/ui/app-gradient"
import type { User } from "@/lib/db/schemas/users"
import type { Profile } from "@/lib/db/schemas/profiles"

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

function ChatContent({
  user,
  profile,
  avatar,
}: Omit<ChatProps, "accessToken">) {
  const { status } = useVoice()
  const [isSpeaking, _setIsSpeaking] = useState(false)
  const ref = useRef<ComponentRef<typeof Messages>>(null)

  const displayName = profile?.display_name || user.first_name
  const companionName = avatar.name
  const _isActive = status.value === "connected"

  return (
    <>
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
            I'm {companionName}, your personal companion. What would you like to
            talk about today?
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto h-full w-full max-w-3xl px-4 pb-32">
        <Messages ref={ref} />
      </div>

      <Controls />
      <StartCall />
    </>
  )
}

export default function Chat({
  accessToken,
  user,
  profile,
  avatar,
}: ChatProps) {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col overflow-hidden">
      <ChatRadialGradient />
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={env.NEXT_PUBLIC_HUME_CONFIG_ID}
      >
        <ChatContent user={user} profile={profile} avatar={avatar} />
      </VoiceProvider>
    </div>
  )
}
