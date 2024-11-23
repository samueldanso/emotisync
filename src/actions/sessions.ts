"use server"

import { db } from "@/db/db"
import { sessions } from "@/db/schemas"
import { eq } from "drizzle-orm"
import { getUser } from "@/lib/supabase/server"
import { catchError } from "@/lib/utils/errors"
import type { Session, NewSession } from "@/db/schemas"

export async function getSessions() {
  try {
    const user = await getUser()
    if (!user?.id) throw new Error("Unauthorized")

    const result = await db.query.sessions.findMany({
      where: eq(sessions.userId, user.id),
      orderBy: (sessions, { desc }) => [desc(sessions.created_at)],
    })

    return { data: result, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function getSession(id: string) {
  try {
    const user = await getUser()
    if (!user?.id) throw new Error("Unauthorized")

    const session = await db.query.sessions.findFirst({
      where: eq(sessions.id, id),
    })

    if (!session) throw new Error("Session not found")

    return { data: session, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function createSession(data: NewSession) {
  try {
    const user = await getUser()
    if (!user?.id) throw new Error("Unauthorized")

    const [session] = await db.insert(sessions).values(data).returning()

    return { data: session, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function updateSession(id: string, data: Partial<Session>) {
  try {
    const user = await getUser()
    if (!user?.id) throw new Error("Unauthorized")

    const [session] = await db
      .update(sessions)
      .set({ ...data, updated_at: new Date() })
      .where(eq(sessions.id, id))
      .returning()

    return { data: session, error: null }
  } catch (error) {
    return catchError(error)
  }
}
