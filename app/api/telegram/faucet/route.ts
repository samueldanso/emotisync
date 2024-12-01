import { NextResponse } from "next/server"
import { unstable_noStore as noStore } from "next/cache"
import { env } from "@/env"

export async function POST(request: Request) {
  noStore()
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1]
    if (!token) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 },
      )
    }

    // Request faucet tokens from Capx
    const response = await fetch(`${env.CAPX_API_URL}/wallet/faucet`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()
    if (!data.success) {
      return NextResponse.json(
        { success: false, error: "Failed to get faucet tokens" },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      result: data.result,
    })
  } catch (error) {
    console.error("Error requesting faucet tokens:", error)
    return NextResponse.json(
      { success: false, error: "Failed to get faucet tokens" },
      { status: 500 },
    )
  }
}
