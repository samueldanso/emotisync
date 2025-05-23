// import type { User } from "@/lib/db/schemas/users"
// import type { Profile } from "@/lib/db/schemas/profiles"
// import type { Companion } from "@/lib/db/schemas/companions"
// import {
//   PERSONALITY_TYPES,
//   PERSONALITY_DESCRIPTIONS,
// } from "@/lib/constants/onboarding"

// export class SessionManager {
//   private endSession: () => void
//   private sendWarning: () => void

//   constructor() {
//     this.endSession = () => {
//       // Initialize empty, will be set by handleTiming
//     }
//     this.sendWarning = () => {
//       // Initialize empty, will be set by handleTiming
//     }
//   }

//   initializeSession(user: User, profile: Profile, _avatar: Companion) {
//     const personalityType =
//       PERSONALITY_TYPES[_avatar.personality as keyof typeof PERSONALITY_TYPES]
//     const personalityDesc = PERSONALITY_DESCRIPTIONS[personalityType]

//     return {
//       type: "session_settings" as const,
//       variables: {
//         first_name: user.first_name,
//         companion_name: _avatar.name,
//         goal: profile.goal,
//       },
//       context: {
//         text: `You are ${personalityDesc}. Your name is ${_avatar.name} and you're helping ${user.first_name} with their goal to ${profile.goal}.`,
//         type: "persistent" as const,
//       },
//     }
//   }

//   handleTiming(onWarning: () => void, onEnd: () => void) {
//     const SESSION_DURATION = 120000 // 2 minutes
//     const WARNING_TIME = 60000 // 1 minute
//     let sessionTimer: NodeJS.Timeout
//     let warningTimer: NodeJS.Timeout

//     this.sendWarning = onWarning
//     this.endSession = onEnd

//     return {
//       startSession: () => {
//         sessionTimer = setTimeout(this.endSession, SESSION_DURATION)
//         warningTimer = setTimeout(this.sendWarning, WARNING_TIME)
//       },
//       cleanup: () => {
//         clearTimeout(sessionTimer)
//         clearTimeout(warningTimer)
//       },
//     }
//   }
// }

// export const sessionManager = new SessionManager()
