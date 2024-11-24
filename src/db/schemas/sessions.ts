import { pgTable, text, uuid, timestamp, jsonb } from "drizzle-orm/pg-core"
import { users } from "./users"

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  messages:
    jsonb("messages").$type<
      {
        type: string
        content: string
        emotions?: Record<string, number>
        timestamp: string
      }[]
    >(),
  summary: text("summary"),
  dominant_emotions: text("dominant_emotions").array(),
  duration: text("duration"),
  created_at: timestamp("created_at").defaultNow(),
  ended_at: timestamp("ended_at"),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert
