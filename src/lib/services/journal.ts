import { db } from "@/db/db"
import { journals } from "@/db/schemas"
import { getUser } from "@/actions/auth"
import { catchError } from "@/lib/utils/errors"
import type { NewJournal } from "@/db/schemas"

export async function generateJournalEntry({
  conversation,
  emotional_state,
  user_goal,
}: {
  conversation: any[]
  emotional_state: string
  user_goal: string
}): Promise<NewJournal> {
  const user = await getUser()
  if (!user?.id) throw new Error("Unauthorized")

  return {
    userId: user.id,
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
