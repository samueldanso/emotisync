"use server"

import { db } from "@/db/db"
import { recommendations } from "@/db/schemas"
import { eq } from "drizzle-orm"
import { getUser } from "@/lib/supabase/server"
import { catchError } from "@/lib/utils/errors"

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
