import { NextResponse } from "next/server"
import { unstable_noStore as noStore } from "next/cache"
import { env } from "@/env"
import type { CapxResponse, CapxAuthResult } from "@/lib/types/capx"

export async function POST(request: Request) {
  noStore()
  try {
    const initData = request.headers.get("x-initdata")

    if (!initData) {
      return NextResponse.json(
        { success: false, error: "No init data provided" },
        { status: 400 },
      )
    }

    // Call CapX SuperApp API with verified initData
    const capxResponse = await fetch(`${env.CAPX_API_URL}/users/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-initdata": initData,
        "x-client-id": env.CAPX_CLIENT_ID,
        "x-client-secret": env.CAPX_CLIENT_SECRET,
      },
    })

    if (!capxResponse.ok) {
      console.error("CapX Error:", await capxResponse.text())
      return NextResponse.json(
        { success: false, error: "Failed to get user data" },
        { status: 401 },
      )
    }

    const capxData = (await capxResponse.json()) as CapxResponse<CapxAuthResult>
    return NextResponse.json({
      success: true,
      ...capxData.result,
    })
  } catch (error) {
    console.error("Error in telegram callback:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    )
  }
}
