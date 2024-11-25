import { create } from "zustand"
import type { Message } from "@humeai/voice-react"

interface ChatState {
  messages: Message[]
  emotional_state: string
  isLoading: boolean
  setMessages: (messages: Message[]) => void
  setEmotionalState: (state: string) => void
  setLoading: (loading: boolean) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  emotional_state: "neutral",
  isLoading: false,
  setMessages: (messages) => set({ messages }),
  setEmotionalState: (state) => set({ emotional_state: state }),
  setLoading: (loading) => set({ isLoading: loading }),
}))
