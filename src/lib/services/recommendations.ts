import { db } from "@/db/db"
import { recommendations } from "@/db/schemas"
import { eq } from "drizzle-orm"
import { catchError } from "@/lib/utils/errors"
import { getUser } from "@/lib/supabase/server"

// Export the type since it's used in seedDefaultRecommendations
export type NewRecommendation = typeof recommendations.$inferInsert

export async function getRecommendations() {
  try {
    const user = await getUser()
    if (!user?.id) throw new Error("Unauthorized")

    const result = await db.query.recommendations.findMany({
      where: eq(recommendations.userId, user.id),
      orderBy: (recommendations, { desc }) => [
        desc(recommendations.created_at),
      ],
    })

    return { data: result, error: null }
  } catch (error) {
    return catchError(error)
  }
}

export async function seedDefaultRecommendations(userId: string) {
  try {
    const defaultExercises = [
      {
        userId,
        title: "4-7-8 Breathing",
        type: "breathing" as const,
        description: "A calming breathing technique to reduce anxiety",
        content: "Inhale for 4 counts, hold for 7, exhale for 8",
        duration: "2 minutes",
        steps: [
          "Find a comfortable position",
          "Inhale quietly through your nose for 4 counts",
          "Hold your breath for 7 counts",
          "Exhale completely through your mouth for 8 counts",
          "Repeat the cycle 3-4 times",
        ],
      },
      {
        userId,
        title: "Box Breathing",
        type: "breathing" as const,
        description: "A simple technique to help you stay present and calm",
        content: "Equal counts of inhale, hold, exhale, and hold",
        duration: "2 minutes",
        steps: [
          "Breathe in for 4 counts",
          "Hold for 4 counts",
          "Breathe out for 4 counts",
          "Hold for 4 counts",
          "Repeat the cycle",
        ],
      },
    ]

    const result = await db
      .insert(recommendations)
      .values(defaultExercises)
      .returning()

    return { data: result, error: null }
  } catch (error) {
    return catchError(error)
  }
}
