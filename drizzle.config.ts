import { env } from "./env"
import type { Config } from "drizzle-kit"

export default {
  schema: "./lib/db/schemas/index.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config
