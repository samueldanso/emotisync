import {
  pgTable,
  text,
  uuid,
  boolean,
  timestamp,
  date,
} from "drizzle-orm/pg-core"
import { users } from "./users"
import { companions } from "./companions"

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  display_name: text("display_name"),
  goal: text("goal").notNull(),
  date_of_birth: date("date_of_birth"),
  gender: text("gender"),
  companion_name: text("companion_name").notNull(),
  companion_avatar: uuid("companion_avatar")
    .references(() => companions.id)
    .notNull(),
  onboarding_completed: boolean("onboarding_completed").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type Profile = typeof profiles.$inferSelect
export type NewProfile = typeof profiles.$inferInsert
