import { NextResponse } from "next/server"
import { verifyTelegramInitData } from "@/lib/telegram/verify"
import { unstable_noStore as noStore } from "next/cache"

export async function POST(request: Request) {
  noStore()
  try {
    const { initData } = await request.json()

    if (!initData) {
      return NextResponse.json(
        { success: false, error: "No init data provided" },
        { status: 400 },
      )
    }

    const result = await verifyTelegramInitData(initData)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 401 },
      )
    }

    return NextResponse.json({ success: true, initData: result.initData })
  } catch (error) {
    console.error("Error in telegram verify route:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    )
  }
}
