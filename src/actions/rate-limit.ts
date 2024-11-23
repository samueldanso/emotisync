"use server"

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { getUser } from "@/lib/supabase/server"
import type { SessionAvailabilityResponse } from "@/lib/types"

export const rateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 d"),
  analytics: true,
  prefix: "emotisync:daily-limit",
})

export async function checkSessionAvailability(): Promise<SessionAvailabilityResponse> {
  try {
    const user = await getUser()
    if (!user?.id) {
      return {
        canStart: false,
        remainingMinutes: 0,
        resetAt: new Date(),
        message: "Unauthorized",
        error: "Unauthorized",
      }
    }

    const { success, reset, remaining } = await rateLimiter.limit(user.id)
    const remainingMinutes = remaining * 2 // Each session is 2 minutes
    const resetDate = new Date(reset)

    if (!success) {
      return {
        canStart: false,
        remainingMinutes: 0,
        resetAt: resetDate,
        message: "You've reached your daily limit. Try again tomorrow.",
        error: null,
      }
    }

    return {
      canStart: true,
      remainingMinutes,
      resetAt: resetDate,
      message: `You have ${remainingMinutes} minutes remaining today`,
      error: null,
    }
  } catch (error) {
    return {
      canStart: false,
      remainingMinutes: 0,
      resetAt: new Date(),
      message: error instanceof Error ? error.message : "An error occurred",
      error: error instanceof Error ? error.message : "An error occurred",
    }
  }
}
