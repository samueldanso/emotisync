import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"

export const avatars = pgTable("avatars", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  image_url: text("image_url").notNull(),
  personality: text("personality").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type Avatar = typeof avatars.$inferSelect
export type NewAvatar = typeof avatars.$inferInsert
