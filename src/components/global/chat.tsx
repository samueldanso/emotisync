"use client"

import { VoiceProvider, type Message } from "@humeai/voice-react"
import Messages from "./messages"
import Controls from "./controls"
import { StartCall } from "./start-call"
import { type ComponentRef, useRef, useState } from "react"
import { env } from "@/env"
import { AvatarStatus } from "./avatar-status"

interface ChatProps {
  accessToken: string
  avatar: {
    image_url: string
    name: string
  }
}

export default function Chat({ accessToken, avatar }: ChatProps) {
  const timeout = useRef<number | null>(null)
  const ref = useRef<ComponentRef<typeof Messages>>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col overflow-hidden">
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={env.NEXT_PUBLIC_HUME_CONFIG_ID}
        onMessage={(msg: Message) => {
          if (timeout.current) {
            window.clearTimeout(timeout.current)
          }

          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight
              ref.current.scrollTo({
                top: scrollHeight,
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
        <div className="relative z-20 flex flex-col items-center py-8">
          <AvatarStatus
            avatar={avatar.image_url}
            name={avatar.name}
            isSpeaking={isSpeaking}
          />
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
