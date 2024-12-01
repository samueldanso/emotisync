import { NextResponse } from "next/server"
import { noStore } from "@/lib/utils/server"
import { checkOnboardingStatus } from "@/actions/profile"
import { createUser } from "@/actions/user"
import { v4 as uuidv4 } from "uuid"
import { env } from "@/env"

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
      },
    })

    if (!capxResponse.ok) {
      const errorText = await capxResponse.text()
      console.error("CapX Error:", {
        status: capxResponse.status,
        response: errorText,
        initData,
      })
      return NextResponse.json(
        { success: false, error: "Failed to get user data" },
        { status: 401 },
      )
    }

    const capxData = await capxResponse.json()

    if (!capxData?.result?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Failed to get user data" },
        { status: 401 },
      )
    }

    const telegramUser = capxData.result.user

    // Create or update user in our database
    const { data: user, error } = await createUser(
      `${telegramUser.id}@telegram.com`,
      uuidv4(),
      {
        auth_provider: "telegram",
        telegram_id: telegramUser.id.toString(),
        first_name: telegramUser.first_name,
        last_name: telegramUser.last_name || null,
      },
    )

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 })
    }

    // Check onboarding status
    const { isOnboarded, error: profileError } = await checkOnboardingStatus(
      telegramUser.id,
    )

    if (profileError) {
      return NextResponse.json(
        { success: false, error: profileError },
        { status: 500 },
      )
    }

    // Return successful response with tokens and user data
    return NextResponse.json({
      success: true,
      user: {
        ...user,
        onboarding_completed: isOnboarded,
      },
      tokens: {
        access_token: capxData.result.access_token,
        refresh_token: capxData.result.refresh_token,
      },
      isOnboarded,
      signup_tx: capxData.result.signup_tx || null,
    })
  } catch (error) {
    console.error("Error in telegram callback:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    )
  }
}
