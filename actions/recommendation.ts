"use server"

import { db } from "@/lib/db/db"
import { recommendations } from "@/lib/db/schemas/recommendations"
import { catchError } from "@/lib/utils/errors"
import { eq } from "drizzle-orm"
import type { RecommendationContext } from "@/lib/types/recommendation"

export async function createRecommendation(
  userId: string,
  journalId: string,
  title: string,
  description: string,
  category: string,
  type: string,
  emotional_context: RecommendationContext,
) {
  try {
    const [recommendation] = await db
      .insert(recommendations)
      .values({
        userId,
        journalId,
        title,
        description,
        category,
        type,
        emotional_context,
      })
      .returning()

    return { data: recommendation, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function getUserRecommendations(userId: string) {
  try {
    const userRecommendations = await db.query.recommendations.findMany({
      where: eq(recommendations.userId, userId),
      orderBy: (recommendations, { desc }) => [
        desc(recommendations.created_at),
      ],
    })

    return { data: userRecommendations, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function updateRecommendationStatus(id: string, status: string) {
  try {
    const [recommendation] = await db
      .update(recommendations)
      .set({ status })
      .where(eq(recommendations.id, id))
      .returning()

    return { data: recommendation, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function getRecommendationsByJournal(journalId: string) {
  try {
    const journalRecommendations = await db.query.recommendations.findMany({
      where: eq(recommendations.journalId, journalId),
      orderBy: (recommendations, { desc }) => [
        desc(recommendations.created_at),
      ],
    })

    return { data: journalRecommendations, error: null }
  } catch (error) {
    return catchError(error)
  }
}
