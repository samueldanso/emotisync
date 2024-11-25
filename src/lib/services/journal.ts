import type { Message } from "@humeai/voice-react"
import type { NewJournal } from "@/lib/db/schemas/journals"
import type { EmotionalInsight } from "@/lib/types/journal"
import { db } from "@/lib/db/db"
import { journals } from "@/lib/db/schemas"

export function generateJournalEntry({
  userId,
  messages,
  emotional_state,
}: {
  userId: string
  messages: Message[]
  emotional_state: string
}): NewJournal {
  const now = new Date()
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  const emotional_insights: EmotionalInsight = {
    dominant_emotion: emotional_state,
    timestamp: now.toISOString(),
  }

  return {
    userId,
    title: `Chat Session - ${timeStr}`,
    summary: messages
      .filter((m) => m.type === "user_message")
      .map((m) => m.text)
      .join(" "),
    emotional_insights,
    created_at: now,
    updated_at: now,
  }
}

export async function saveJournalEntry(entry: NewJournal) {
  return await db.insert(journals).values(entry).returning()
}
