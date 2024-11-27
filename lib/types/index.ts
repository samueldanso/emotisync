import type { Duration } from "@upstash/ratelimit"

export type ActionType = "default"

export interface RateLimitProps {
  actionType?: ActionType
  identifier: string
}

export interface RateLimitResponse {
  canStart: boolean
  remainingMinutes: number
  resetAt: Date
  message: string
  error: string | null
}

export interface SlidingWindowConfig {
  limit: number
  duration: Duration
}
