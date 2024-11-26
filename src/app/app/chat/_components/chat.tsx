"use client"

import { useVoice } from "@humeai/voice-react"
import Messages from "@/components/global/messages"
import Controls from "@/components/global/controls"
import { StartCall } from "@/components/global/start-call"
import { type ComponentRef, useRef, useState, useEffect } from "react"
import { AvatarStatus } from "@/components/global/avatar-status"
import type { User } from "@/lib/db/schemas/users"
import type { Profile } from "@/lib/db/schemas/profiles"
import type { Companion } from "@/lib/db/schemas/companions"

interface SessionProps {
  user: User
  profile: Profile
  avatar: Companion
}

function SessionContent({
  user,
  profile,
  avatar,
}: Omit<SessionProps, "accessToken">) {
  const { status, messages } = useVoice()
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesRef = useRef<ComponentRef<typeof Messages>>(null)

  const displayName = profile?.display_name || user.first_name

  // Monitor messages to detect AI speaking state
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

  const isActive = status.value === "connected"
  const isListening = isActive && !isSpeaking

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex h-full flex-col items-center">
        {!isActive ? (
          // Welcome State
          <div className="flex h-full flex-col items-center justify-center">
            <AvatarStatus
              avatar={avatar.image_url}
              name={avatar.name}
              isListening={false}
              isSpeaking={false}
            />
            <div className="mb-8 text-center">
              <h2 className="mb-2 font-semibold text-2xl">
                Welcome back {displayName}
              </h2>
              <p className="text-muted-foreground">
                I'm {avatar.name}, your AI companion
              </p>
            </div>
            <StartCall />
          </div>
        ) : (
          // Active Chat State
          <>
            <div className="relative z-20 pt-16 pb-8">
              <AvatarStatus
                avatar={avatar.image_url}
                name={avatar.name}
                isSpeaking={isSpeaking}
                isListening={isListening}
              />
            </div>

            <div className="relative z-10 h-full w-full max-w-3xl overflow-hidden px-4">
              <Messages ref={messagesRef} />
            </div>
          </>
        )}

        {isActive && (
          <div className="-translate-x-1/2 fixed bottom-8 left-1/2 z-50">
            <Controls />
          </div>
        )}
      </div>
    </div>
  )
}

export default function Session({ user, profile, avatar }: SessionProps) {
  return (
    <div className="relative flex h-[calc(100vh-4rem)] w-full grow flex-col overflow-hidden">
      <SessionContent user={user} profile={profile} avatar={avatar} />
    </div>
  )
}
