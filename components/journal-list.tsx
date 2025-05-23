"use client"

import { useEffect } from "react"
import { useJournalStore } from "@/stores/journal-store"
import { JournalCard } from "@/components/journal-card"
import type { Journal } from "@/lib/types/journal"

interface JournalListProps {
  initialJournals: Journal[]
}

export function JournalList({ initialJournals }: JournalListProps) {
  const { journals, setJournals, isLoading } = useJournalStore()

  useEffect(() => {
    if (initialJournals) {
      setJournals(initialJournals)
    }
  }, [initialJournals, setJournals])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div
          className="h-24 animate-pulse rounded-lg bg-muted"
          key="skeleton-1"
        />
        <div
          className="h-24 animate-pulse rounded-lg bg-muted"
          key="skeleton-2"
        />
        <div
          className="h-24 animate-pulse rounded-lg bg-muted"
          key="skeleton-3"
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {journals?.map((journal) => (
        <JournalCard
          key={journal.id}
          id={journal.id}
          title={journal.title}
          summary={journal.summary}
          created_at={journal.created_at}
          dominant_emotion={journal.emotional_insights.dominant_emotion}
        />
      ))}
    </div>
  )
}
