export interface EmotionalInsight {
  dominant_emotion: string
  timestamp: string
}

export interface Journal {
  id: string
  userId: string
  title: string
  summary: string
  emotional_insights: EmotionalInsight
  created_at: Date | null
  updated_at: Date | null
}
