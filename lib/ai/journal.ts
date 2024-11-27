// Comment out the entire file for now since we're focusing on chat
/*
import { db } from "@/lib/db/db"
import { journals } from "@/lib/db/schemas"
import { eq } from "drizzle-orm"
import type { Message } from "@humeai/voice-react"

export async function getJournal(id: string) {
  try {
    const journal = await db.query.journals.findFirst({
      where: eq(journals.id, id),
    })

    return {
      data: journal,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: "Failed to fetch journal",
    }
  }
}

export async function saveJournal(
  userId: string,
  messages: Message[],
  emotional_insights: any,
) {
  try {
    const now = new Date()

    const [journal] = await db.insert(journals).values({
      user_id: userId,
      summary: messages
        .filter((m) => m.type === "user_message")
        .map((m) => m.text)
        .join(" "),
      emotional_insights,
      created_at: now,
      updated_at: now,
    })

    return {
      data: journal,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: "Failed to save journal",
    }
  }
}
*/
