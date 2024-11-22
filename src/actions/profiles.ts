"use server"

import { db } from "@/db/db"
import { profiles, users, avatars } from "@/db/schemas"
import type { Profile } from "@/db/schemas"
import { catchError } from "@/lib/utils/errors"
import { eq } from "drizzle-orm"

interface CreateProfileData {
  goal: string
  companionName: string
  companionAvatar: string
  email: string
}

export async function createCompleteProfile(
  userId: string,
  data: CreateProfileData,
): Promise<{ data: Profile | null; error: string | null }> {
  try {
    if (!userId) throw new Error("User ID is required")
    if (!data.goal) throw new Error("Goal is required")
    if (!data.companionName) throw new Error("Companion name is required")
    if (!data.companionAvatar) throw new Error("Companion avatar is required")
    if (!data.email) throw new Error("Email is required")

    return await db.transaction(async (tx) => {
      const existingProfile = await tx.query.profiles.findFirst({
        where: eq(profiles.userId, userId),
      })

      if (existingProfile) {
        return { data: existingProfile, error: null }
      }

      const avatar = await tx.query.avatars.findFirst({
        where: eq(avatars.id, data.companionAvatar),
      })

      if (!avatar) {
        throw new Error("Selected avatar does not exist")
      }

      const [profile] = await tx
        .insert(profiles)
        .values({
          userId,
          goal: data.goal,
          companion_name: data.companionName,
          companion_avatar: data.companionAvatar,
          onboarding_completed: true,
        })
        .returning()

      return { data: profile, error: null }
    })
  } catch (error) {
    return catchError(error)
  }
}

export async function checkOnboardingStatus(userId: string) {
  try {
    if (!userId) {
      throw new Error("User ID is required")
    }

    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, userId),
    })

    return {
      isOnboarded: profile?.onboarding_completed ?? false,
      error: null,
    }
  } catch (error) {
    return {
      isOnboarded: false,
      error: catchError(error).error,
    }
  }
}

export async function updateUserName(userId: string, name: string) {
  try {
    const nameParts = name.trim().split(/\s+/)
    const first_name = nameParts[0]
    const last_name = nameParts.length > 1 ? nameParts.slice(1).join(" ") : null

    const [user] = await db
      .update(users)
      .set({
        name,
        first_name,
        last_name,
      })
      .where(eq(users.id, userId))
      .returning()
    return { data: user, error: null }
  } catch (error) {
    return catchError(error)
  }
}
