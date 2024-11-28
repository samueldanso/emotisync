import { pgTable, text, uuid, timestamp, jsonb } from "drizzle-orm/pg-core"
import { users } from "./users"
import { journals } from "./journals"

export const recommendations = pgTable("recommendations", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  journal_id: uuid("journal_id").references(() => journals.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  type: text("type").notNull(),
  status: text("status").default("pending").notNull(),
  emotional_context: jsonb("emotional_context").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
})

export type Recommendation = typeof recommendations.$inferSelect
export type NewRecommendation = typeof recommendations.$inferInsert
