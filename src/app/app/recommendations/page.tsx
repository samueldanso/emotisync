"use client"

import { RecommendationCard } from "./_components/recommendation-card"
import { Spinner } from "@/components/icons/spinner"
import { toast } from "sonner"
import { getRecommendations } from "@/actions/recommendations"
import { useState, useEffect } from "react"
import type { Recommendation } from "@/db/schemas/recommendations"

// Convert database type to component type
const convertRecommendation = (rec: Recommendation) => ({
  title: rec.title,
  type: rec.type,
  description: rec.description,
  duration: rec.duration ?? undefined,
  content: rec.content,
  audio_url: rec.audio_url ?? undefined,
  steps: rec.steps ?? undefined,
})

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const { data, error } = await getRecommendations()
        if (error) throw new Error(error)
        if (data) {
          setRecommendations(data as Recommendation[])
        }
      } catch (_error) {
        toast.error("Failed to load recommendations")
      } finally {
        setLoading(false)
      }
    }
    fetchRecommendations()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 font-heading text-3xl">Your Recommendations</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-4 font-semibold text-xl">Action Steps</h2>
          {recommendations
            .filter((rec) => rec.type === "action")
            .map((rec) => (
              <RecommendationCard
                key={rec.id}
                recommendation={convertRecommendation(rec)}
              />
            ))}
        </div>
        <div>
          <h2 className="mb-4 font-semibold text-xl">Breathing Exercises</h2>
          {recommendations
            .filter((rec) => rec.type === "breathing")
            .map((rec) => (
              <RecommendationCard
                key={rec.id}
                recommendation={convertRecommendation(rec)}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
