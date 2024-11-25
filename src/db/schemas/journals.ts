import { pgTable, text, uuid, timestamp, jsonb } from "drizzle-orm/pg-core"
import { users } from "./users"

export const journals = pgTable("journals", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  emotional_insights: jsonb("emotional_insights").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type Journal = typeof journals.$inferSelect
export type NewJournal = typeof journals.$inferInsert
