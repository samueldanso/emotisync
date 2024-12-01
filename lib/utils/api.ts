import { env } from "@/env"
import { refreshCapXToken } from "./token-refresh"
import { getTokens, setTokens, removeTokens } from "./cookies"
import type { CapxResponse } from "@/lib/types/capx"

const BASE_URL = env.CAPX_API_URL

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean
}

async function handleResponse<T>(response: Response): Promise<CapxResponse<T>> {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Request failed")
  }

  return data
}

async function handleRequest<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<CapxResponse<T>> {
  const { requiresAuth = true, headers: customHeaders = {}, ...rest } = options
  const baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  }

  // Merge custom headers
  Object.entries(customHeaders).forEach(([key, value]) => {
    if (typeof value === "string") {
      baseHeaders[key] = value
    }
  })

  // Add auth header if required
  if (requiresAuth) {
    const { accessToken } = getTokens()
    if (!accessToken) {
      throw new Error("No access token")
    }
    baseHeaders.authorization = `Bearer ${accessToken}`
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: baseHeaders,
      ...rest,
    })

    // Handle 401 by refreshing token
    if (response.status === 401) {
      const refreshToken = getTokens().refreshToken
      if (!refreshToken) {
        throw new Error("No refresh token")
      }

      try {
        const tokens = await refreshCapXToken(refreshToken)
        setTokens(tokens.access_token, tokens.refresh_token)

        // Retry original request
        return handleRequest(endpoint, options)
      } catch (_refreshError) {
        removeTokens()
        throw new Error("Token refresh failed")
      }
    }

    return handleResponse<T>(response)
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

export const api = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    handleRequest<T>(endpoint, { method: "GET", ...options }),

  post: <T>(endpoint: string, data?: any, options?: FetchOptions) =>
    handleRequest<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    }),

  put: <T>(endpoint: string, data?: any, options?: FetchOptions) =>
    handleRequest<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    }),

  delete: <T>(endpoint: string, options?: FetchOptions) =>
    handleRequest<T>(endpoint, { method: "DELETE", ...options }),
}
