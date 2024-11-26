"use server"

// import { Ratelimit } from "@upstash/ratelimit"
// import { Redis } from "@upstash/redis"
// import { getUser } from "@/lib/supabase/server"
// import type { SessionAvailabilityResponse } from "@/lib/types"

// // Simplified rate limiter for MVP - 5 sessions per day
// const rateLimiter = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(5, "1d"),
// })

// export async function checkChatAvailability(): Promise<SessionAvailabilityResponse> {
//   try {
//     const user = await getUser()
//     if (!user?.id) {
//       return {
//         canStart: false,
//         remainingMinutes: 0,
//         resetAt: new Date(),
//         message: "Please log in to start a session",
//         error: "Unauthorized",
//       }
//     }

//     const { success, reset, remaining } = await rateLimiter.limit(user.id)
//     const resetAt = new Date(reset)

//     if (!success) {
//       return {
//         canStart: false,
//         remainingMinutes: 0,
//         resetAt,
//         message: "Daily limit reached. Try again tomorrow!",
//         error: null,
//       }
//     }

//     return {
//       canStart: true,
//       remainingMinutes: remaining * 2,
//       resetAt,
//       message: `You have ${remaining} sessions remaining today`,
//       error: null,
//     }
//   } catch {
//     return {
//       canStart: false,
//       remainingMinutes: 0,
//       resetAt: new Date(),
//       message: "Unable to check session availability",
//       error: "Server error",
//     }
//   }
// }
