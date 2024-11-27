import "server-only"
import { env } from "../../env"
import { fetchAccessToken } from "hume"

export const getHumeAccessToken = async () => {
  const accessToken = await fetchAccessToken({
    apiKey: String(env.HUME_API_KEY),
    secretKey: String(env.HUME_SECRET_KEY),
  })

  if (accessToken === "undefined") {
    return null
  }

  return accessToken ?? null
}
