"use server"

import { getUser } from "@/lib/supabase/server"
import { seedDefaultRecommendations } from "@/lib/services/recommendations"
import { catchError } from "@/lib/utils/errors"

export async function getRecommendations() {
  try {
    const user = await getUser()
    if (!user?.id) throw new Error("Unauthorized")

    const result = await seedDefaultRecommendations(user.id)
    return { data: result, error: null }
  } catch (error) {
    return catchError(error)
  }
}
