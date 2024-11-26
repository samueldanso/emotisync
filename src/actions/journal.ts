"use server";

// Comment out everything for now since we're focusing on chat
/*
import { db } from "@/lib/db/db"
import { journals } from "@/lib/db/schemas"
import type { NewJournal } from "@/lib/db/schemas"
import { eq } from "drizzle-orm"
import { generateJournalEntry } from "@/lib/services/journal"
import type { Message } from "@humeai/voice-react"

interface SaveJournalActionProps {
  userId: string
  messages: Message[]
  emotional_insights: any
}

export async function saveJournalAction({
  userId,
  messages,
  emotional_insights,
}: SaveJournalActionProps) {
  try {
    const journal = await generateJournalEntry(userId, messages, emotional_insights)
    return journal
  } catch (error) {
    return {
      data: null,
      error: "Failed to save journal",
    }
  }
}

export async function getJournalAction(id: string) {
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
*/
