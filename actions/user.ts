"use server"

import { db } from "@/lib/db/db"
import { users } from "@/lib/db/schemas"
import { eq } from "drizzle-orm"
import { catchError } from "@/lib/utils/errors"
import type { CreateUserOptions } from "@/lib/types/user"

export async function createUser(
  email: string,
  id: string,
  options: CreateUserOptions,
) {
  try {
    // Check existing user
    const existingUser = await db.query.users.findFirst({
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
        last_name: options.last_name,
        name: `${options.first_name}${
          options.last_name ? ` ${options.last_name}` : ""
        }`,
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
