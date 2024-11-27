"use client"

import { useVoice } from "@humeai/voice-react"
import Messages from "@/components/messages"
import Controls from "@/components/controls"
import { StartCall } from "@/components/start-call"
import { type ComponentRef, useRef, useState, useEffect } from "react"
import { AvatarStatus } from "@/components/avatar-status"
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

const CallGradient = () => (
  <div
    className="pointer-events-none absolute inset-0 opacity-50"
    style={{
      background: `
        radial-gradient(
          circle at center,
          hsl(var(--brand-primary)) 0%,
          transparent 70%
        )
      `,
      animation: "pulse 4s ease-in-out infinite",
    }}
  />
)

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

      // Clear any existing timeout
      if (speakingTimeoutRef.current) {
        clearTimeout(speakingTimeoutRef.current)
      }

      // Set speaking state based on message type
      if (lastMessage.type === "assistant_message") {
        setIsSpeaking(true)

        // Add a small delay before setting to false to prevent flicker
        speakingTimeoutRef.current = setTimeout(() => {
          setIsSpeaking(false)
        }, 500) // Reduced from 2000ms to 500ms for better sync
      } else {
        setIsSpeaking(false)
      }
    } else {
      setIsSpeaking(false)
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
      {isActive && <CallGradient />}
      {!isActive ? (
        <div className="flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <AvatarStatus
              avatar={avatar.image_url}
              name={companionName}
              isSpeaking={false}
              isListening={false}
            />
            <div className="mt-8 space-y-3">
              <h1 className="font-semibold text-2xl md:text-3xl">
                {getGreeting()}, {displayName}
              </h1>
              <p className="font-medium text-lg text-muted-foreground">
                I'm {companionName}, How are you feeling today?
              </p>
            </div>
            <div className="mt-8">
              <StartCall />
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-background">
          <div className="flex h-full flex-col">
            <div className="flex-shrink-0 pt-8 pb-4 text-center">
              <AvatarStatus
                avatar={avatar.image_url}
                name={companionName}
                isSpeaking={isSpeaking}
                isListening={isListening}
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <Messages ref={ref} user={user} profile={profile} />
            </div>
            <div className="flex-shrink-0 p-4">
              <Controls />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Chat(props: ChatProps) {
  return <ChatContent {...props} />
}
