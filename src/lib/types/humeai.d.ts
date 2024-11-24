declare module "@humeai/voice-react" {
  export interface Message {
    type: string
    text?: string
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
    sendMessage: (text: string) => Promise<void>
    sendSessionSettings: (settings: any) => void
  }
}
