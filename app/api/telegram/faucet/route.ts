import { NextResponse } from "next/server"
import { env } from "@/env"

export async function POST() {
  try {
    const response = await fetch(`${env.CAPX_API_URL}/wallet/faucet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Faucet request failed")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Faucet error:", error)
    return NextResponse.json(
      { success: false, error: "Faucet request failed" },
      { status: 500 },
    )
  }
}
