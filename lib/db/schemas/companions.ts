import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"

export const companions = pgTable("companions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  image_url: text("image_url").notNull(),
  personality: text("personality").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type Companion = typeof companions.$inferSelect
export type NewCompanion = typeof companions.$inferInsert
