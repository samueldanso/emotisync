import { create } from "zustand"
import type { Journal } from "@/lib/types/journal"

interface JournalState {
  journals: Journal[]
  isLoading: boolean
  setJournals: (journals: Journal[]) => void
  setLoading: (isLoading: boolean) => void
}

export const useJournalStore = create<JournalState>((set) => ({
  journals: [],
  isLoading: false,
  setJournals: (journals) => set({ journals }),
  setLoading: (isLoading) => set({ isLoading }),
}))
