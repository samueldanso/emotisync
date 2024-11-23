"use client"

import { useEffect, useState } from "react"
import { JournalCard } from "./_components/journal-card"
import { Spinner } from "@/components/icons/spinner"
import { toast } from "sonner"
import { getJournals } from "@/actions/journals"
import type { Journal } from "@/db/schemas/journals"

export default function JournalsPage() {
  const [journals, setJournals] = useState<Journal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJournals() {
      try {
        const { data, error } = await getJournals()
        if (error) throw new Error(error)
        if (!data) throw new Error("No data returned")

        const transformedData = data.map((journal) => ({
          ...journal,
          key_points: journal.key_points ?? [],
          emotional_insights: journal.emotional_insights ?? [],
          recommendations: journal.recommendations ?? [],
          created_at: journal.created_at ?? new Date(),
          updated_at: journal.updated_at ?? new Date(),
        }))

        setJournals(transformedData)
      } catch (_error) {
        toast.error("Failed to load journals")
      } finally {
        setLoading(false)
      }
    }
    fetchJournals()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (journals.length === 0) {
    return (
      <div className="container py-8">
        <h1 className="mb-8 font-heading text-3xl">Your Journal Entries</h1>
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            No journal entries yet. Start a conversation to create one!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 font-heading text-3xl">Your Journal Entries</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {journals.map((journal) => (
          <JournalCard key={journal.id} journal={journal} />
        ))}
      </div>
    </div>
  )
}
