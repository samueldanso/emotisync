"use server"

import { db } from "@/db/db"
import { journals } from "@/db/schemas"
import { eq } from "drizzle-orm"
import { getUser } from "@/lib/supabase/server"
import { catchError } from "@/lib/utils/errors"
import type { NewJournal } from "@/db/schemas"

export async function getJournals() {
  try {
    const user = await getUser()
    if (!user?.id) throw new Error("Unauthorized")

    const result = await db.query.journals.findMany({
      where: eq(journals.userId, user.id),
      orderBy: (journals, { desc }) => [desc(journals.created_at)],
    })

    return { data: result, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function getJournal(id: string) {
  try {
    const user = await getUser()
    if (!user?.id) throw new Error("Unauthorized")

    const journal = await db.query.journals.findFirst({
      where: eq(journals.id, id),
    })

    if (!journal) throw new Error("Journal not found")

    return { data: journal, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function createJournal(data: NewJournal) {
  try {
    const user = await getUser()
    if (!user?.id) throw new Error("Unauthorized")

    const [journal] = await db.insert(journals).values(data).returning()

    return { data: journal, error: null }
  } catch (error) {
    return catchError(error)
  }
}
