"use client"

import { useEffect } from "react"
import { useRecommendationStore } from "@/stores/recommendation-store"
import { RecommendationCard } from "@/components/recommendation-card"
import type { Recommendation } from "@/lib/types/recommendation"

interface RecommendationListProps {
  initialRecommendations: Recommendation[]
}

export function RecommendationList({
  initialRecommendations,
}: RecommendationListProps) {
  const { recommendations, setRecommendations, isLoading } =
    useRecommendationStore()

  useEffect(() => {
    if (initialRecommendations) {
      setRecommendations(initialRecommendations)
    }
  }, [initialRecommendations, setRecommendations])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={`skeleton-${i}`}
            className="h-24 animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recommendations?.map((recommendation) => (
        <RecommendationCard key={recommendation.id} {...recommendation} />
      ))}
    </div>
  )
}
