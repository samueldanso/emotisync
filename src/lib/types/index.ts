import type { Duration } from "@upstash/ratelimit"

export interface SlidingWindowConfig {
  limit: number
  duration: Duration
}

export interface RateLimitProps {
  actionType?: ActionType
  identifier?: string
}

export type ActionType = "testRateLimiter"

export type PersonalityType = "The Listener" | "The Energizer" | "The Anchor"
