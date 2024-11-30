import { env } from "@/env"

export async function refreshCapXToken(refreshToken: string) {
  try {
    const response = await fetch(`${env.CAPX_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    const data = await response.json()
    if (!data.success) throw new Error("Token refresh failed")

    return {
      access_token: data.result.access_token,
      refresh_token: data.result.refresh_token,
    }
  } catch (error) {
    console.error("Token refresh error:", error)
    throw error
  }
}
