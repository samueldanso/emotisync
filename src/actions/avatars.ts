"use server"

import { db } from "@/db/db"
import { avatars } from "@/db/schemas"
import { catchError } from "@/lib/utils/errors"
import { eq } from "drizzle-orm"
import type { Avatar, NewAvatar } from "@/db/schemas"

export async function getAvatars() {
  try {
    const result = await db.query.avatars.findMany({
      orderBy: avatars.created_at,
    })

    return { data: result, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function getAvatarById(id: string) {
  try {
    if (!id) throw new Error("Avatar ID is required")

    const avatar = await db.query.avatars.findFirst({
      where: eq(avatars.id, id),
    })

    if (!avatar) {
      throw new Error("Avatar not found")
    }

    return { data: avatar, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function createAvatar(
  data: NewAvatar,
): Promise<{ data: Avatar | null; error: string | null }> {
  try {
    if (!data.name) throw new Error("Avatar name is required")
    if (!data.image_url) throw new Error("Avatar image URL is required")
    if (!data.personality) throw new Error("Avatar personality is required")

    const [avatar] = await db.insert(avatars).values(data).returning()

    return { data: avatar, error: null }
  } catch (error) {
    return catchError(error)
  }
}
