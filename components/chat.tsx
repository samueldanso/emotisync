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
import { motion } from "framer-motion"
import { generateTypewriterKey } from "@/lib/utils/text"

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

  const displayName =
    profile?.display_name || user.first_name || user.name || "there"
  const companionName = profile.companion_name || avatar.name

  return (
    <div className="relative flex h-full flex-col">
      {!isActive ? (
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="relative mb-8 h-32 w-32 md:h-36 md:w-36">
              <AvatarStatus
                avatar={avatar.image_url}
                name={companionName}
                isSpeaking={false}
                isListening={false}
              />
            </div>
            <div className="mb-16 space-y-4 text-center">
              <motion.h1 className="font-semibold text-3xl text-foreground">
                {Array.from(`${getGreeting()}, ${displayName}`).map(
                  (char, index) => (
                    <motion.span
                      key={generateTypewriterKey(char, index, "chat-greeting")}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.1,
                        delay: index * 0.05,
                      }}
                    >
                      {char}
                    </motion.span>
                  ),
                )}
              </motion.h1>
              <motion.p
                className="text-muted-foreground text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                I'm {companionName}, How are you feeling today? Let's talk.
              </motion.p>
            </div>
            <StartCall />
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex-shrink-0 py-8 text-center">
            <AvatarStatus
              avatar={avatar.image_url}
              name={companionName}
              isSpeaking={isSpeaking}
              isListening={isListening}
            />
          </div>
          <div className="flex-1 overflow-hidden px-4">
            <Messages
              ref={ref}
              companionName={companionName}
              displayName={displayName}
            />
          </div>
          <div className="flex-shrink-0 p-6">
            <Controls userId={user.id} displayName={displayName} />
          </div>
        </div>
      )}
    </div>
  )
}

export default function Chat(props: ChatProps) {
  return <ChatContent {...props} />
}
