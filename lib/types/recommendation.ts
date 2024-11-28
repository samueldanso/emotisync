import type { Recommendation } from "@/lib/db/schemas/recommendations"

export type RecommendationType = "text" | "audio"
export type RecommendationCategory =
  | "mood-boosting"
  | "mindfulness"
  | "activity"
export type RecommendationStatus = "pending" | "active" | "completed"

export interface RecommendationContext {
  dominant_emotion: string
  intensity: number
  timestamp: string
}

export type { Recommendation }
