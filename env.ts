import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    SUPABASE_SERVICE_KEY: z.string().min(1),
    HUME_API_KEY: z.string().min(1),
    HUME_SECRET_KEY: z.string().min(1),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    TELEGRAM_BOT_TOKEN: z.string().min(1),
    CAPX_CLIENT_ID: z.string().min(1),
    CAPX_CLIENT_SECRET: z.string().min(1),
    CAPX_API_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_PRIVY_APP_ID: z.string().min(1),
    NEXT_PUBLIC_HUME_CONFIG_ID: z.string().min(1),
    NEXT_PUBLIC_CAPX_CHAIN_ID: z.string().min(1),
    NEXT_PUBLIC_CAPX_CHAIN_NETWORK_NAME: z.string().min(1),
    NEXT_PUBLIC_CAPX_CHAIN_RPC_URL: z.string().url(),
    NEXT_PUBLIC_CAPX_CHAIN_EXPLORE_URL: z.string().url(),
    NEXT_PUBLIC_CAPX_CHAIN_CURRENCY: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
    HUME_API_KEY: process.env.HUME_API_KEY,
    HUME_SECRET_KEY: process.env.HUME_SECRET_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    CAPX_CLIENT_ID: process.env.CAPX_CLIENT_ID,
    CAPX_CLIENT_SECRET: process.env.CAPX_CLIENT_SECRET,
    CAPX_API_URL: process.env.CAPX_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
    NEXT_PUBLIC_HUME_CONFIG_ID: process.env.NEXT_PUBLIC_HUME_CONFIG_ID,
    NEXT_PUBLIC_CAPX_CHAIN_ID: process.env.NEXT_PUBLIC_CAPX_CHAIN_ID,
    NEXT_PUBLIC_CAPX_CHAIN_NETWORK_NAME:
      process.env.NEXT_PUBLIC_CAPX_CHAIN_NETWORK_NAME,
    NEXT_PUBLIC_CAPX_CHAIN_RPC_URL: process.env.NEXT_PUBLIC_CAPX_CHAIN_RPC_URL,
    NEXT_PUBLIC_CAPX_CHAIN_EXPLORE_URL:
      process.env.NEXT_PUBLIC_CAPX_CHAIN_EXPLORE_URL,
    NEXT_PUBLIC_CAPX_CHAIN_CURRENCY:
      process.env.NEXT_PUBLIC_CAPX_CHAIN_CURRENCY,
  },
})
