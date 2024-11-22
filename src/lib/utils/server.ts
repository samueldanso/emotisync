import { headers } from "next/headers"

export function noStore() {
  return headers().get("cache-control") || "no-store"
}
