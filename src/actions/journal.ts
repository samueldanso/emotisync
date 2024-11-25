"use server"

import { db } from "@/lib/db/db"
import { journals } from "@/lib/db/schemas"
import { catchError } from "@/lib/utils/errors"
import type { NewJournal } from "@/lib/db/schemas"
import { eq } from "drizzle-orm"
import { generateJournalEntry } from "@/lib/services/journal"
import type { Message } from "@humeai/voice-react"

interface SaveJournalActionProps {
  userId: string
  messages: Message[]
  emotional_state: string
}

export async function getJournals(userId: string) {
  try {
    const entries = await db.query.journals.findMany({
      where: eq(journals.userId, userId),
      orderBy: (journals, { desc }) => [desc(journals.created_at)],
    })
    return { data: entries, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function getJournal(id: string) {
  try {
    const result = await db.query.journals.findFirst({
      where: eq(journals.id, id),
    })
    return { data: result, error: null }
  } catch (error) {
    return catchError(error)
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

export async function deleteJournal(id: string) {
  try {
    await db.delete(journals).where(eq(journals.id, id))
    return { error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function saveJournalAction(data: SaveJournalActionProps) {
  try {
    return await db.transaction(async (tx) => {
      const journalEntry = generateJournalEntry({
        userId: data.userId,
        messages: data.messages,
        emotional_state: data.emotional_state,
      })

      const [journal] = await tx
        .insert(journals)
        .values(journalEntry)
        .returning()

      return { data: journal, error: null }
    })
  } catch (error) {
    return catchError(error)
  }
}
