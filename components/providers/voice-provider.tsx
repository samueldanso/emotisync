"use client"

import { VoiceProvider as HumeVoiceProvider } from "@humeai/voice-react"
import { env } from "../../env"

interface VoiceProviderProps {
  accessToken: string
  children: React.ReactNode
}

export function VoiceProvider({ accessToken, children }: VoiceProviderProps) {
  return (
    <HumeVoiceProvider
      auth={{ type: "accessToken", value: accessToken }}
      configId={env.NEXT_PUBLIC_HUME_CONFIG_ID}
    >
      {children}
    </HumeVoiceProvider>
  )
}
