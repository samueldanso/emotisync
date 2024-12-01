import { createHmac } from "node:crypto"
import { env } from "@/env"

interface VerifyInitDataResult {
  success: boolean
  initData?: string
  error?: string
}

export async function verifyTelegramInitData(
  initDataRaw: string,
): Promise<VerifyInitDataResult> {
  try {
    // Debug log
    console.log("Verifying:", initDataRaw)

    // Required environment variables check
    if (!env.TELEGRAM_BOT_TOKEN) {
      throw new Error("TELEGRAM_BOT_TOKEN is not configured")
    }
    if (!env.CAPX_CLIENT_ID) {
      throw new Error("CAPX_CLIENT_ID is not configured")
    }
    if (!env.CAPX_CLIENT_SECRET) {
      throw new Error("CAPX_CLIENT_SECRET is not configured")
    }

    // Parse and validate init data
    const urlParams = new URLSearchParams(initDataRaw)
    const hash = urlParams.get("hash")
    if (!hash) {
      return { success: false, error: "No hash provided" }
    }

    // Remove hash from params for validation
    urlParams.delete("hash")
    const params = Array.from(urlParams.entries()).sort()

    // Create check string for Telegram validation
    let dataCheckString = params
      .map(([key, value]) => `${key}=${value}`)
      .join("\n")

    // First hash check with Telegram
    const secret = createHmac("sha256", "WebAppData")
      .update(env.TELEGRAM_BOT_TOKEN)
      .digest()
    const calculatedHash = createHmac("sha256", secret)
      .update(dataCheckString)
      .digest("hex")

    // Verify Telegram hash
    if (hash !== calculatedHash) {
      return { success: false, error: "Invalid InitData" }
    }

    // Add CapX client_id
    urlParams.append("client_id", env.CAPX_CLIENT_ID)
    const newParams = Array.from(urlParams.entries()).sort()

    // Create new check string for CapX
    dataCheckString = newParams
      .map(([key, value]) => `${key}=${value}`)
      .join("\n")
      .slice(0, -1)

    // Generate CapX hash
    const capxSecret = createHmac("sha256", "WebAppData")
      .update(env.CAPX_CLIENT_SECRET)
      .digest()
    const capxHash = createHmac("sha256", capxSecret)
      .update(dataCheckString)
      .digest("hex")

    // Add CapX hash
    urlParams.append("hash", capxHash)

    // Add logging to verify the values
    console.log("CapX Auth Debug:", {
      clientId: env.CAPX_CLIENT_ID,
      secretLength: env.CAPX_CLIENT_SECRET.length,
      dataCheckString,
      capxHash,
      params: Array.from(urlParams.entries()),
      method: "WebAppData",
    })

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
