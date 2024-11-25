import { create } from "zustand"

interface SessionState {
  isActive: boolean
  isSpeaking: boolean
  timeRemaining: number
  setActive: (active: boolean) => void
  setSpeaking: (speaking: boolean) => void
  setTimeRemaining: (time: number) => void
}

export const useSessionStore = create<SessionState>((set) => ({
  isActive: false,
  isSpeaking: false,
  timeRemaining: 120,
  setActive: (active) => set({ isActive: active }),
  setSpeaking: (speaking) => set({ isSpeaking: speaking }),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
}))
