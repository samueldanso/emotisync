import { index, pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    first_name: text("first_name").notNull(),
    last_name: text("last_name"),
    name: text("name").notNull(),
    auth_provider: text("auth_provider", {
      enum: ["google", "telegram"],
    }).notNull(),
    telegram_id: text("telegram_id").unique(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    idx_users_email: index("idx_users_email").on(table.email),
    idx_users_telegram_id: index("idx_users_telegram_id").on(table.telegram_id),
  }),
)

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
