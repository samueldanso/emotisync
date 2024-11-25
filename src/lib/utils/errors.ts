import { toast } from "sonner";

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
  if (err instanceof Error) {
    return err.message;
  }

  return "Something went wrong. Please try again later.";
}

/**
 * Displays error toast notification
 * @param {unknown} err - Error object to display
 */
export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);
  return toast.error(errorMessage);
}

export interface ApiError {
  message: string;
  code?: string;
}

export function catchError(error: unknown): { data: null; error: string } {
  console.error("API Error:", error);
  const message = error instanceof Error ? error.message : "An error occurred";
  return { data: null, error: message };
}
