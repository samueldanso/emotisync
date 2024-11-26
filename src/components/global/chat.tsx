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

function ChatContent({ user, profile, avatar }: ChatProps) {
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
        <div className="flex h-full flex-col items-center justify-center p-4">
          <AvatarStatus
            avatar={avatar.image_url}
            name={companionName}
            isSpeaking={false}
            isListening={false}
          />
          <div className="mx-auto mt-6 max-w-md text-center">
            <h1 className="font-semibold text-xl md:text-2xl">
              {getGreeting()}, {displayName}
            </h1>
            <p className="mt-2 text-muted-foreground">
              I'm {companionName}, your personal companion. What would you like
              to talk about?
            </p>
          </div>
          <StartCall />
        </div>
      ) : (
        <div className="fixed inset-0 flex flex-col bg-background">
          <div className="flex-shrink-0 pt-8 pb-4 text-center">
            <AvatarStatus
              avatar={avatar.image_url}
              name={companionName}
              isSpeaking={isSpeaking}
              isListening={isListening}
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <Messages ref={ref} />
            </div>
          </div>
          <div className="flex-shrink-0 p-4">
            <Controls />
          </div>
        </div>
      )}
    </div>
  )
}

export default function Chat(props: ChatProps) {
  return <ChatContent {...props} />
}
