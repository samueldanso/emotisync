"use server"

import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { users } from "@/db/schemas"
import { catchError } from "@/lib/utils/errors"

interface CreateUserOptions {
  auth_provider?: "google" | "telegram"
  telegram_id?: string
}

export async function createUser(
  email: string,
  id: string,
  options: CreateUserOptions = {},
) {
  try {
    console.log("Creating user with:", { email, id, ...options })

    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, id),
    })

    console.log("Existing user check:", existingUser)

    if (existingUser) {
      // Update existing user if needed
      if (options.telegram_id && !existingUser.telegram_id) {
        const [updatedUser] = await db
          .update(users)
          .set({ telegram_id: options.telegram_id })
          .where(eq(users.id, id))
          .returning()
        return { data: updatedUser, error: null }
      }
      return { data: existingUser, error: null }
    }

    const [user] = await db
      .insert(users)
      .values({
        id,
        email,
        name: email.split("@")[0],
        auth_provider: options.auth_provider || "google",
        telegram_id: options.telegram_id,
      })
      .returning()

    console.log("Created new user:", user)

    return { data: user, error: null }
  } catch (error) {
    console.error("Error creating user:", error)
    return catchError(error)
  }
}
