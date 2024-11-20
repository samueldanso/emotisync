"use server"

import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { users } from "@/db/schemas"
import { catchError } from "@/lib/utils/errors"

export async function createTelegramUser(
  email: string,
  id: string,
  telegram_id: string,
) {
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.telegram_id, telegram_id),
    })

    if (existingUser) {
      return { data: existingUser, error: null }
    }

    const [user] = await db
      .insert(users)
      .values({
        id,
        email,
        name: email.split("@")[0],
        auth_provider: "telegram",
        telegram_id,
      })
      .returning()

    return { data: user, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function getTelegramUser(telegram_id: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.telegram_id, telegram_id),
    })
    return { data: user, error: null }
  } catch (error) {
    return catchError(error)
  }
}
