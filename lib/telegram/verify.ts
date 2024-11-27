import { createHmac } from "node:crypto"
import { env } from "../../env"

interface VerifyInitDataResult {
  success: boolean
  initData?: string
  error?: string
}

export async function verifyTelegramInitData(
  initDataRaw: string,
): Promise<VerifyInitDataResult> {
  try {
    if (!env.TELEGRAM_BOT_TOKEN) {
      throw new Error("TELEGRAM_BOT_TOKEN is not configured")
    }
    if (!env.CAPX_CLIENT_ID) {
      throw new Error("CAPX_CLIENT_ID is not configured")
    }
    if (!env.CAPX_CLIENT_SECRET) {
      throw new Error("CAPX_CLIENT_SECRET is not configured")
    }

    const urlParams = new URLSearchParams(initDataRaw)
    const hash = urlParams.get("hash")

    if (!hash) {
      return { success: false, error: "No hash provided" }
    }

    urlParams.delete("hash")
    const params = Array.from(urlParams.entries()).sort()

    // Create check string
    let dataCheckString = params
      .map(([key, value]) => `${key}=${value}`)
      .join("\n")

    // First hash check with Telegram
    const secret = createHmac("sha256", "WebAppData").update(
      env.TELEGRAM_BOT_TOKEN,
    )
    const calculatedHash = createHmac("sha256", secret.digest())
      .update(dataCheckString)
      .digest("hex")

    if (hash !== calculatedHash) {
      return { success: false, error: "Invalid InitData" }
    }

    // Add client_id for Capx
    urlParams.append("client_id", env.CAPX_CLIENT_ID)
    const newParams = Array.from(urlParams.entries()).sort()

    // Create new check string with client_id
    dataCheckString = newParams
      .map(([key, value]) => `${key}=${value}`)
      .join("\n")

    // Generate new hash for Capx
    const capxSecret = createHmac("sha256", "WebAppData").update(
      env.CAPX_CLIENT_SECRET,
    )
    const capxHash = createHmac("sha256", capxSecret.digest())
      .update(dataCheckString)
      .digest("hex")

    urlParams.append("hash", capxHash)

    return {
      success: true,
      initData: urlParams.toString(),
    }
  } catch (error) {
    console.error("Error verifying init data:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
