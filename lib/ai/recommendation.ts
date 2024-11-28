import type { Message } from "@humeai/voice-react"
import type {
  RecommendationContext,
  Recommendation,
} from "@/lib/types/recommendation"

// Helper to get the dominant emotion and intensity from prosody scores
function getEmotionalContext(messages: Message[]): RecommendationContext {
  const lastUserMessage = messages
    .filter((msg) => msg.type === "user_message")
    .pop()

  const emotions = lastUserMessage?.models?.prosody?.scores || {}
  const [dominantEmotion, intensity] = Object.entries(emotions).sort(
    ([, a], [, b]) => b - a,
  )[0] || ["neutral", 0]

  return {
    dominant_emotion: dominantEmotion,
    intensity: intensity as number,
    timestamp: new Date().toISOString(),
  }
}

export function generateRecommendations(
  messages: Message[],
  userId: string,
  journalId: string,
): Omit<Recommendation, "id" | "created_at" | "updated_at" | "status">[] {
  const emotional_context = getEmotionalContext(messages)

  return [
    {
      user_id: userId,
      journal_id: journalId,
      title: "Quick Mindfulness Exercise",
      description: "Take 3 deep breaths and focus on the present moment.",
      category: "mindfulness",
      type: "text",
      emotional_context,
    },
    {
      user_id: userId,
      journal_id: journalId,
      title: "Mood Boosting Activity",
      description: "List three things you're grateful for right now.",
      category: "mood-boosting",
      type: "text",
      emotional_context,
    },
  ]
}
