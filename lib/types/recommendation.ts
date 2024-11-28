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

export interface Recommendation {
  id: string
  userId: string
  journalId?: string
  title: string
  description: string
  category: RecommendationCategory
  type: RecommendationType
  status: RecommendationStatus
  emotional_context: RecommendationContext
  created_at: Date | null
  updated_at: Date | null
}
