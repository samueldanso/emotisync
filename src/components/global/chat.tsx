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
  const speakingTimeoutRef = useRef<NodeJS.Timeout>()

  const isActive = status.value === "connected"
  const isListening = isActive && !isSpeaking

  useEffect(() => {
    if (status.value === "connected" && messages?.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.type === "assistant_message") {
        if (speakingTimeoutRef.current) {
          clearTimeout(speakingTimeoutRef.current)
        }
        setIsSpeaking(true)
        speakingTimeoutRef.current = setTimeout(() => {
          setIsSpeaking(false)
        }, 2000)
      }
    }

    return () => {
      if (speakingTimeoutRef.current) {
        clearTimeout(speakingTimeoutRef.current)
      }
    }
  }, [messages, status.value])

  const displayName = profile?.display_name || user.first_name
  const companionName = profile.companion_name || avatar.name

  return (
    <div className="relative flex h-full flex-col">
      {!isActive ? (
        <div className="flex h-full flex-col items-center justify-center p-4 md:p-8">
          <div className="relative z-10">
            <AvatarStatus
              avatar={avatar.image_url}
              name={companionName}
              isSpeaking={false}
              isListening={false}
            />
            <div className="mt-8 text-center">
              <h1 className="font-semibold text-xl md:text-2xl">
                {getGreeting()}, {displayName}
              </h1>
              <p className="mt-3 px-4 text-base text-muted-foreground md:px-0">
                I'm {companionName}, your personal companion. What would you
                like to talk about today?
              </p>
            </div>
          </div>
          <StartCall />
        </div>
      ) : (
        <div className="fixed inset-0 flex flex-col items-center justify-between bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--brand-primary)/5,transparent_100%)] opacity-50" />
          <div className="flex w-full flex-1 flex-col items-center justify-center px-4 md:px-8">
            <div className="mb-6 md:mb-8">
              <AvatarStatus
                avatar={avatar.image_url}
                name={companionName}
                isSpeaking={isSpeaking}
                isListening={isListening}
              />
            </div>
            <div className="w-full max-w-2xl">
              <Messages ref={ref} />
            </div>
          </div>
          <div className="mx-auto w-full max-w-md flex-shrink-0 pb-6 md:pb-8">
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
