declare module "@humeai/voice-react" {
  export interface Message {
    type: string
    message?: { content: string }
    models?: {
      prosody?: {
        scores: Record<string, number>
      }
    }
  }

  export interface VoiceContextType {
    status: { value: string }
    connect: (options?: any) => Promise<void>
    disconnect: () => void
    messages: Message[]
    isMuted: boolean
    unmute: () => void
    mute: () => void
    micFft: number[]
  }

  export function VoiceProvider(props: any): JSX.Element
  export function useVoice(): VoiceContextType
}
