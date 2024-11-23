import { db } from "@/db/db"
import { journals } from "@/db/schemas"
import { catchError } from "@/lib/utils/errors"
import type { NewJournal } from "@/db/schemas"

export function generateJournalEntry({
  userId,
  conversation,
  emotional_state,
  user_goal,
}: {
  userId: string
  conversation: any[]
  emotional_state: string
  user_goal: string
}): NewJournal {
  return {
    userId,
    summary: `Conversation about ${emotional_state} emotions`,
    key_points: conversation
      .filter((msg) => msg.type === "user_message")
      .map((msg) => msg.text || ""),
    emotional_insights: [emotional_state],
    recommendations: [`Based on your goal to ${user_goal}, try...`],
  }
}

export async function saveJournalEntry(data: NewJournal) {
  try {
    const [journal] = await db.insert(journals).values(data).returning()
    return { data: journal, error: null }
  } catch (error) {
    return catchError(error)
  }
}
