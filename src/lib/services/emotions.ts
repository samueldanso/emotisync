import type { Message } from "@humeai/voice-react"

export function getCurrentEmotions(messages: Message[]): string {
  // Get the latest emotion from Hume AI messages
  const emotionMessages = messages.filter((m) => m.type === "emotion_detected")

  if (emotionMessages.length === 0) {
    return "neutral"
  }

  // Get the most recent emotion
  const latestEmotion = emotionMessages[emotionMessages.length - 1]
  return latestEmotion.text || "neutral"
}
