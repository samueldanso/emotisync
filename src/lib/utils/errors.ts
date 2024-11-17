import { toast } from "sonner"
import { z } from "zod"

/**
 * Error handling utilities for consistent error management across the app
 *
 * @module ErrorUtils
 */

/**
 * Extracts user-friendly error message from various error types
 * @param {unknown} err - Error object (Zod validation error, standard Error, or unknown)
 * @returns {string} Human-readable error message
 */
export function getErrorMessage(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return errors.join("\n")
  }

  if (err instanceof Error) {
    return err.message
  }

  return "Something went wrong. Please try again later."
}

/**
 * Displays error toast notification
 * @param {unknown} err - Error object to display
 */
export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err)
  return toast.error(errorMessage)
}

export function catchError(err: unknown) {
  return {
    data: null,
    error: getErrorMessage(err),
  }
}
