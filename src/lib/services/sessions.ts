import { db } from "@/db/db"
import { sessions } from "@/db/schemas/sessions"
import type { Message } from "@humeai/voice-react"

export async function saveSession({
  userId,
  messages,
  emotions,
}: {
  userId: string
  messages: Message[]
  emotions: string[]
}) {
  return db.insert(sessions).values({
    userId,
    messages: messages.map((msg) => ({
      type: msg.type,
      content: msg.text || "",
      emotions: msg.models?.prosody?.scores,
      timestamp: new Date().toISOString(),
    })),
    dominant_emotions: emotions,
    ended_at: new Date(),
    duration: "2 minutes", // For MVP, all sessions are 2 minutes
  })
}
