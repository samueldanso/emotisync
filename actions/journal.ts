"use server"

import { db } from "@/lib/db/db"
import { journals } from "@/lib/db/schemas/journals"
import { catchError } from "@/lib/utils/errors"
import { eq } from "drizzle-orm"
import type { EmotionalInsight } from "@/lib/types/journal"

export async function createJournal(
  userId: string,
  title: string,
  summary: string,
  emotional_insights: EmotionalInsight,
) {
  try {
    const [journal] = await db
      .insert(journals)
      .values({
        userId,
        title,
        summary,
        emotional_insights,
      })
      .returning()

    return { data: journal, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function getUserJournals(userId: string) {
  try {
    const userJournals = await db.query.journals.findMany({
      where: eq(journals.userId, userId),
      orderBy: (journals, { desc }) => [desc(journals.created_at)],
    })

    return { data: userJournals, error: null }
  } catch (error) {
    return catchError(error)
  }
}
