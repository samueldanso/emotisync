export interface EmotionalInsight {
  dominant_emotion: string
  timestamp: string
}

export interface JournalEntry {
  id: string
  title: string
  summary: string
  emotional_insights: EmotionalInsight
  created_at: Date
  updated_at: Date
}
