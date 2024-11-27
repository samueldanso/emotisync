// export interface JournalEntry {
//   summary: string
//   key_points: string[]
//   emotional_insights: string[]
//   recommendations: string[]
// }

// // Tool definition for Hume AI dashboard - exact match with working version
// export const journalTool = {
//   name: "generate_journal_entry",
//   description:
//     "Generate a journal entry with insights and recommendations based on the conversation",
//   parameters: {
//     type: "object",
//     properties: {
//       conversation_context: {
//         type: "string",
//         description: "The full conversation transcript",
//       },
//       emotional_state: {
//         type: "string",
//         description: "Current emotional state",
//       },
//       user_goal: {
//         type: "string",
//         description: "User's goal",
//       },
//     },
//     required: ["conversation_context", "emotional_state", "user_goal"],
//   },
// }
