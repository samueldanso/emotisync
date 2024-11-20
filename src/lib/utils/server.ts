import { headers } from "next/headers";

/**
 * Utility to prevent caching in route handlers
 */
export function noStore() {
  return headers().get("cache-control") || "no-store";
}
