import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core"
import { users } from "./users"

export const recommendations = pgTable("recommendations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  title: text("title").notNull(),
  type: text("type", {
    enum: ["action", "breathing"],
  }).notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  steps: text("steps").array(),
  audio_url: text("audio_url"),
  duration: text("duration"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type Recommendation = typeof recommendations.$inferSelect
export type NewRecommendation = typeof recommendations.$inferInsert
