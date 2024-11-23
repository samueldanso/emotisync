"use server"

import { db } from "@/db/db"
import { journals } from "@/db/schemas"
import { catchError } from "@/lib/utils/errors"
import type { NewJournal } from "@/db/schemas/journals"
import { eq } from "drizzle-orm"

export async function getJournals() {
  try {
    const result = await db.query.journals.findMany({
      orderBy: (journals, { desc }) => [desc(journals.created_at)],
    })
    return { data: result, error: null }
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
