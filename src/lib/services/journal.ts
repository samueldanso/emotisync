import type { NewJournal } from "@/db/schemas/journals"
import { saveJournalEntry as saveEntry } from "@/actions/journals"

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

// Re-export saveJournalEntry for use in chat.tsx
export { saveEntry as saveJournalEntry }
