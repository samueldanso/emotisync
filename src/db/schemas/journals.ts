import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core"
import { users } from "./users"

export const journals = pgTable("journals", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  summary: text("summary").notNull(),
  key_points: text("key_points").array(),
  emotional_insights: text("emotional_insights").array(),
  recommendations: text("recommendations").array(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type Journal = typeof journals.$inferSelect
export type NewJournal = typeof journals.$inferInsert
