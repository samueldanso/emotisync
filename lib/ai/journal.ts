import type { Message } from "@humeai/voice-react"
import type { EmotionalInsight } from "@/lib/types/journal"

export function generateJournalEntry(messages: Message[]) {
  // Get the last emotion reading from the conversation
  const lastUserMessage = messages
    .filter((msg) => msg.type === "user_message")
    .pop()

  const emotionalInsight: EmotionalInsight = {
    dominant_emotion: getTopEmotion(
      lastUserMessage?.models?.prosody?.scores || {},
    ),
    timestamp: new Date().toISOString(),
  }

  // Create simple title and summary
  const title = `Journal Entry - ${new Date().toLocaleDateString()}`
  const summary = messages
    .filter((msg) => msg.type === "user_message")
    .map((msg) => msg.message?.content || "")
    .join(" ")

  return {
    title,
    summary,
    emotional_insights: emotionalInsight,
  }
}

function getTopEmotion(emotions: Record<string, number>): string {
  if (Object.keys(emotions).length === 0) return "neutral"

  return Object.entries(emotions).sort(([, a], [, b]) => b - a)[0][0]
}
