import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { createTelegramUser } from "@/actions/telegram"
import { checkOnboardingStatus } from "@/actions/profiles"
import { env } from "@/env"

export async function POST(request: Request) {
  headers().set("cache-control", "no-store")
  try {
    const initData = request.headers.get("x-initdata")

    if (!initData) {
      return NextResponse.json(
        { success: false, error: "No init data provided" },
        { status: 400 },
      )
    }

    // Get user data from Capx
    const capxResponse = await fetch(`${env.CAPX_API_URL}/users/auth`, {
      method: "POST",
      headers: {
        "x-initdata": initData,
      },
    })

    const capxData = await capxResponse.json()

    if (!capxData?.result?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Failed to get user data" },
        { status: 401 },
      )
    }

    // Create or update user in our database
    const { error: userError } = await createTelegramUser(
      capxData.result.user.email,
      capxData.result.user.id,
      capxData.result.user.telegram_id,
    )

    if (userError) {
      return NextResponse.json(
        { success: false, error: userError },
        { status: 500 },
      )
    }

    const { isOnboarded, error: profileError } = await checkOnboardingStatus(
      capxData.result.user.id,
    )

    if (profileError) {
      return NextResponse.json(
        { success: false, error: profileError },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      user: capxData.result.user,
      tokens: {
        access_token: capxData.result.access_token,
        refresh_token: capxData.result.refresh_token,
      },
      isOnboarded,
      signup_tx: capxData.result.signup_tx,
    })
  } catch (error) {
    console.error("Error in telegram callback:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    )
  }
}
