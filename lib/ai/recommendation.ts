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

// Map emotions to recommendation categories
const emotionToCategoryMap: Record<string, string[]> = {
  anxiety: ["mindfulness", "mood-boosting"],
  stress: ["mindfulness", "mood-boosting"],
  sadness: ["mood-boosting", "activity"],
  tiredness: ["activity", "mindfulness"],
  joy: ["activity", "mood-boosting"],
  neutral: ["mindfulness", "activity"],
  // Add more emotion mappings as needed
}

// Generate recommendation based on emotional context
function generateRecommendationContent(
  emotion: string,
  intensity: number,
): Pick<Recommendation, "title" | "description" | "category" | "type"> {
  const categories = emotionToCategoryMap[emotion] || ["mood-boosting"]
  const category = categories[0] as Recommendation["category"]

  // Example recommendation templates
  const templates = {
    "mood-boosting": {
      high: {
        title: "Channel Your Energy",
        description:
          "Your energy is high! Try this quick journaling exercise to capture your positive thoughts.",
        type: "text" as const,
      },
      low: {
        title: "Quick Mood Lift",
        description:
          "Take 3 deep breaths and name 3 things you're grateful for right now.",
        type: "text" as const,
      },
    },
    mindfulness: {
      high: {
        title: "Grounding Exercise",
        description:
          "Find a quiet spot and try this 2-minute breathing exercise to center yourself.",
        type: "audio" as const,
      },
      low: {
        title: "Mindful Moment",
        description:
          "Take a moment to observe your surroundings. What do you notice?",
        type: "text" as const,
      },
    },
    activity: {
      high: {
        title: "Energy Release",
        description:
          "Go for a quick 5-minute walk to help process your emotions.",
        type: "text" as const,
      },
      low: {
        title: "Gentle Movement",
        description: "Try these simple desk stretches to boost your energy.",
        type: "text" as const,
      },
    },
  }

  const intensityLevel = intensity > 0.5 ? "high" : "low"
  const template = templates[category][intensityLevel]

  return {
    ...template,
    category,
  }
}

export function generateRecommendations(
  messages: Message[],
  userId: string,
  journalId: string,
): Omit<Recommendation, "id" | "created_at" | "updated_at" | "status">[] {
  const emotional_context = getEmotionalContext(messages)
  const { dominant_emotion, intensity } = emotional_context

  // Generate primary recommendation
  const primaryRec = generateRecommendationContent(dominant_emotion, intensity)

  // Generate secondary recommendation of different type
  const categories = emotionToCategoryMap[dominant_emotion] || ["mood-boosting"]
  const _secondaryCategory = categories[1] || categories[0]
  const secondaryRec = generateRecommendationContent(
    dominant_emotion,
    intensity,
  )

  return [
    {
      userId,
      journalId,
      emotional_context,
      ...primaryRec,
    },
    {
      userId,
      journalId,
      emotional_context,
      ...secondaryRec,
    },
  ]
}

// Function to be called by Hume AI tool
export async function generateRecommendationTool(
  emotion: string,
  intensity: number,
  _context: string,
): Promise<string> {
  // This function would be registered as a tool in Hume AI config
  const recommendation = generateRecommendationContent(emotion, intensity)
  return JSON.stringify({
    title: recommendation.title,
    description: recommendation.description,
    category: recommendation.category,
    type: recommendation.type,
  })
}
