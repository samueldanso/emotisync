"use server"

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { getUser } from "@/lib/supabase/server"

// 10 minutes daily limit
const rateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10 * 60, "1d"), // 10 minutes in seconds
})

interface UsageResponse {
  canStart: boolean
  remainingSeconds: number
  resetAt: Date
  message: string
}

export async function checkUsageLimit(): Promise<UsageResponse> {
  try {
    const user = await getUser()
    if (!user?.id) {
      return {
        canStart: false,
        remainingSeconds: 0,
        resetAt: new Date(),
        message: "Please log in to start a conversation",
      }
    }

    const { success, reset, remaining } = await rateLimiter.limit(user.id)
    const resetAt = new Date(reset)

    if (!success) {
      return {
        canStart: false,
        remainingSeconds: 0,
        resetAt,
        message: "Daily limit reached. Try again tomorrow!",
      }
    }

    return {
      canStart: true,
      remainingSeconds: remaining,
      resetAt,
      message: `You have ${Math.floor(remaining / 60)} minutes remaining today`,
    }
  } catch {
    return {
      canStart: false,
      remainingSeconds: 0,
      resetAt: new Date(),
      message: "Unable to check usage limit",
    }
  }
}
