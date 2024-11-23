"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Spinner } from "@/components/icons/spinner"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { getJournal } from "@/actions/journals"
import { RecommendationCard } from "../../recommendations/_components/recommendation-card"

interface JournalEntry {
  id: string
  userId: string | null
  summary: string
  key_points: string[]
  emotional_insights: string[]
  recommendations: string[]
  created_at: Date | null
  updated_at: Date | null
}

export default function JournalDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [journal, setJournal] = useState<JournalEntry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJournal() {
      try {
        const { data, error } = await getJournal(id as string)
        if (error) throw new Error(error)
        if (!data) throw new Error("Journal not found")
        setJournal({
          ...data,
          key_points: data.key_points ?? [],
          emotional_insights: data.emotional_insights ?? [],
          recommendations: data.recommendations ?? [],
        } as JournalEntry)
      } catch (_error) {
        toast.error("Failed to load journal entry")
        router.push("/app/journals")
      } finally {
        setLoading(false)
      }
    }
    fetchJournal()
  }, [id, router])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!journal) return null

  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push("/app/journals")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Journals
      </Button>

      <div className="space-y-8">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h1 className="font-heading text-3xl">Journal Entry</h1>
            <time className="text-muted-foreground text-sm">
              {journal.created_at
                ? formatDate(new Date(journal.created_at))
                : "No date"}
            </time>
          </div>
          <p className="text-lg">{journal.summary}</p>
        </div>

        <div>
          <h2 className="mb-4 font-heading text-2xl">Key Points</h2>
          <ul className="list-inside list-disc space-y-2">
            {journal.key_points.map((point) => (
              <li key={`point-${point}`}>{point}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-heading text-2xl">Emotional Insights</h2>
          <div className="flex flex-wrap gap-2">
            {journal.emotional_insights.map((insight) => (
              <span
                key={`insight-${insight}`}
                className="rounded-full bg-primary/10 px-3 py-1 text-primary text-sm"
              >
                {insight}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-heading text-2xl">Recommendations</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {journal.recommendations.map((rec) => (
              <RecommendationCard
                key={`rec-${rec}`}
                recommendation={{
                  title: rec,
                  type: "action",
                  description: rec,
                  content: rec,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
