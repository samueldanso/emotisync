import { NextResponse } from "next/server"
import { env } from "@/env"
import { getTelegramUser } from "@/actions/user"

export async function POST(request: Request) {
  try {
    const { telegram_id } = await request.json()

    if (!telegram_id) {
      return NextResponse.json(
        { success: false, error: "No telegram ID provided" },
        { status: 400 },
      )
    }

    // Get user details from Capx
    const capxResponse = await fetch(`${env.CAPX_API_URL}/users/details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ telegram_id }),
    })

    const capxData = await capxResponse.json()

    // Get local user data
    const { data: localUser, error } = await getTelegramUser(telegram_id)

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      user: {
        ...localUser,
        ...capxData?.result?.user,
      },
    })
  } catch (error) {
    console.error("Error getting user details:", error)
    return NextResponse.json(
      { success: false, error: "Failed to get user details" },
      { status: 500 },
    )
  }
}
