import type { Duration } from "@upstash/ratelimit"

export type ActionType = "dailySession" | "default"

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

export type PersonalityType = "The Listener" | "The Energizer" | "The Anchor"

export interface SessionAvailabilityResponse {
  canStart: boolean
  remainingMinutes: number
  resetAt: Date
  message: string
  error: string | null
}
