import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { headers } from "next/headers"

/**
 * Utility for merging Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility to prevent caching in route handlers
 */
export function noStore() {
  return headers().get("cache-control") || "no-store"
}
