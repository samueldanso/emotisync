import { pgTable, text, uuid, boolean, timestamp } from "drizzle-orm/pg-core"
import { users } from "./users"
import { avatars } from "./avatars"

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  display_name: text("display_name"),
  goal: text("goal").notNull(),
  companion_name: text("companion_name").notNull(),
  companion_avatar: uuid("companion_avatar")
    .references(() => avatars.id)
    .notNull(),
  onboarding_completed: boolean("onboarding_completed").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type Profile = typeof profiles.$inferSelect
export type NewProfile = typeof profiles.$inferInsert
