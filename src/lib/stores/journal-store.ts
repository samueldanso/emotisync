import { create } from "zustand"
import type { Journal } from "@/lib/db/schemas/journals"

interface JournalState {
  journals: Journal[]
  currentJournal: Journal | null
  isLoading: boolean
  setJournals: (journals: Journal[]) => void
  setCurrentJournal: (journal: Journal | null) => void
  setLoading: (loading: boolean) => void
}

export const useJournalStore = create<JournalState>((set) => ({
  journals: [],
  currentJournal: null,
  isLoading: false,
  setJournals: (journals) => set({ journals }),
  setCurrentJournal: (journal) => set({ currentJournal: journal }),
  setLoading: (loading) => set({ isLoading: loading }),
}))
