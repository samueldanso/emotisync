import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export interface UserMetadata {
  avatar_url?: string;
  picture?: string;
  telegram_photo_url?: string;
  full_name?: string;
}

// Database schema
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name"),
  name: text("name").notNull(),
  auth_provider: text("auth_provider", {
    enum: ["google", "telegram"],
  }).notNull(),
  telegram_id: text("telegram_id").unique(),
  user_metadata: text("user_metadata").default("{}"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export type DbUser = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// Extended user type with metadata
export interface User extends Omit<DbUser, "user_metadata"> {
  user_metadata?: UserMetadata;
}
