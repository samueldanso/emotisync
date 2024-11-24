import type { Message } from "@humeai/voice-react"

export function getCurrentEmotions(messages: Message[]): string {
  // Get the most recent emotions from messages
  const recentMessages = messages.slice(-3)
  const emotions = recentMessages
    .map((msg) => msg.models?.prosody?.scores || {})
    .filter(Boolean)

  // Get top emotions
  const topEmotions = emotions
    .flatMap((emotion) =>
      Object.entries(emotion)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 2)
        .map(([name]) => name),
    )
    .join(", ")

  return topEmotions || "neutral"
}
