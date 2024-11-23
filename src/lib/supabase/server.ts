// import "server-only"

// import { cookies } from "next/headers"

// import { env } from "@/env"
// import { createServerClient, type CookieOptions } from "@supabase/ssr"
// import { createClient } from "@supabase/supabase-js"

// export const supabase = createClient(
//   env.NEXT_PUBLIC_SUPABASE_URL,
//   env.SUPABASE_SERVICE_KEY,
//   {
//     auth: {
//       autoRefreshToken: true,
//       persistSession: true,
//     },
//   },
// )

// export const supabaseAdmin = supabase.auth.admin

// export function supabaseServerClient() {
//   const cookieStore = cookies()

//   const supabase = createServerClient(
//     env.NEXT_PUBLIC_SUPABASE_URL,
//     env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           try {
//             cookieStore.set({ name, value, ...options })
//           } catch (_error) {
//             // Handle error
//           }
//         },
//         remove(name: string, options: CookieOptions) {
//           try {
//             cookieStore.set({ name, value: "", ...options })
//           } catch (_error) {
//             // Handle error
//           }
//         },
//       },
//     },
//   )

//   return supabase
// }

// export async function getUser() {
//   const supabase = supabaseServerClient()

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   return user
// }

import "server-only"

import { cookies } from "next/headers"

import { env } from "@/env"
import { createServerClient } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

export const supabaseAdmin = supabase.auth.admin

export function supbaseServerClient() {
  const cookieStore = cookies()

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              cookieStore.set(name, value, options),
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  )

  return supabase
}

export async function getUser() {
  const supabase = supbaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}
