import { pgTable, text, uuid, timestamp, jsonb } from "drizzle-orm/pg-core"
import { users } from "@/lib/db/schemas/users"
import type { EmotionalInsight } from "@/lib/types/journal"

export const journals = pgTable("journals", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  emotional_insights: jsonb("emotional_insights")
    .$type<EmotionalInsight>()
    .notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type Journal = typeof journals.$inferSelect
export type NewJournal = typeof journals.$inferInsert
