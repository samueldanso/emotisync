"use client"

import { useVoice } from "@humeai/voice-react"
import Messages from "./messages"
import Controls from "./controls"
import { StartCall } from "./start-call"
import { type ComponentRef, useRef, useState, useEffect } from "react"
import { AvatarStatus } from "./avatar-status"
import type { User } from "@/lib/db/schemas/users"
import type { Profile } from "@/lib/db/schemas/profiles"
import type { Companion } from "@/lib/db/schemas/companions"

interface ChatProps {
  user: User
  profile: Profile
  avatar: Companion
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
  const { status, messages } = useVoice()
  const [isSpeaking, setIsSpeaking] = useState(false)
  const ref = useRef<ComponentRef<typeof Messages>>(null)

  useEffect(() => {
    if (status.value === "connected" && messages?.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.type === "assistant_message") {
        setIsSpeaking(true)
        const timeout = setTimeout(() => setIsSpeaking(false), 2000)
        return () => clearTimeout(timeout)
      }
    }
  }, [messages, status.value])

  const displayName = profile?.display_name || user.first_name
  const companionName = profile.companion_name || avatar.name
  const isActive = status.value === "connected"
  const isListening = isActive && !isSpeaking

  return (
    <div className="relative flex h-full flex-col">
      {/* Welcome state */}
      {!isActive ? (
        <div className="flex h-full flex-col items-center justify-center p-4">
          <div className="relative z-10">
            <AvatarStatus
              avatar={avatar.image_url}
              name={companionName}
              isSpeaking={false}
              isListening={false}
            />
            <div className="mb-8 text-center">
              <h1 className="font-semibold text-xl md:text-2xl">
                {getGreeting()}, {displayName}
              </h1>
              <p className="mt-1.5 text-base text-muted-foreground">
                I'm {companionName}, your personal companion. What would you
                like to talk about today?
              </p>
            </div>
          </div>
          <StartCall />
        </div>
      ) : (
        // Chat state
        <div className="flex h-full flex-col">
          <div className="flex-shrink-0 py-6">
            <AvatarStatus
              avatar={avatar.image_url}
              name={companionName}
              isSpeaking={isSpeaking}
              isListening={isListening}
            />
          </div>
          <div className="flex-1 overflow-hidden px-4">
            <Messages ref={ref} />
          </div>
          <div className="flex-shrink-0">
            <Controls />
          </div>
        </div>
      )}
    </div>
  )
}

export default function Chat({ user, profile, avatar }: ChatProps) {
  return <ChatContent {...{ user, profile, avatar }} />
}
