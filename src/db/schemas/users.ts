import { index, pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    idx_users_email: index("idx_users_email").on(table.email),
  }),
)

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
