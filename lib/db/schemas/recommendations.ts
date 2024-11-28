import { pgTable, text, uuid, timestamp, jsonb } from "drizzle-orm/pg-core"
import { users } from "@/lib/db/schemas/users"
import { journals } from "@/lib/db/schemas/journals"
import type { RecommendationContext } from "@/lib/types/recommendation"

export const recommendations = pgTable("recommendations", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  journal_id: uuid("journal_id").references(() => journals.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category", {
    enum: ["mood-boosting", "mindfulness", "activity"],
  }).notNull(),
  type: text("type", {
    enum: ["text", "audio"],
  }).notNull(),
  status: text("status", {
    enum: ["pending", "active", "completed"],
  })
    .default("pending")
    .notNull(),
  emotional_context: jsonb("emotional_context")
    .$type<RecommendationContext>()
    .notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type Recommendation = typeof recommendations.$inferSelect
export type NewRecommendation = typeof recommendations.$inferInsert
