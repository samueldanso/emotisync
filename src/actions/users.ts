"use server"

import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { users } from "@/db/schemas"
import { catchError } from "@/lib/utils/errors"

interface CreateUserOptions {
  auth_provider: "google" | "telegram"
  telegram_id?: string
  first_name: string
  last_name?: string | null
}

export async function createUser(
  email: string,
  id: string,
  options: CreateUserOptions,
) {
  try {
    // Check existing user
    const existingUser = options.telegram_id
      ? await db.query.users.findFirst({
          where: eq(users.telegram_id, options.telegram_id),
        })
      : await db.query.users.findFirst({
          where: eq(users.id, id),
        })

    if (existingUser) {
      return { data: existingUser, error: null }
    }

    // Create new user
    const [user] = await db
      .insert(users)
      .values({
        id,
        email,
        first_name: options.first_name,
        last_name: options.last_name || null,
        name: `${options.first_name}${
          options.last_name ? ` ${options.last_name}` : ""
        }`,
        auth_provider: options.auth_provider,
        telegram_id: options.telegram_id,
      })
      .returning()

    return { data: user, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function getUser(id: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    })
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
