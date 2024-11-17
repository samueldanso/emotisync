"use server"

import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { users } from "@/db/schemas"
import { catchError } from "@/lib/utils/errors"

export async function createUser(email: string, id: string) {
  try {
    console.log("Creating user with:", { email, id })

    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, id),
    })

    console.log("Existing user check:", existingUser)

    if (existingUser) {
      return { data: existingUser, error: null }
    }

    const [user] = await db
      .insert(users)
      .values({
        id,
        email,
        name: email.split("@")[0],
      })
      .returning()

    console.log("Created new user:", user)

    return { data: user, error: null }
  } catch (error) {
    console.error("Error creating user:", error)
    return catchError(error)
  }
}
