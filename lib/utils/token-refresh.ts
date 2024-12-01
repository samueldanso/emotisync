import { env } from "@/env"

interface TokenResponse {
  access_token: string
  refresh_token: string
}

export async function refreshCapXToken(
  refreshToken: string,
): Promise<TokenResponse> {
  const response = await fetch(`${env.CAPX_API_URL}/users/refresh_token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to refresh token")
  }

  const data = await response.json()
  return data.result
}
