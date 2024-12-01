import { NextResponse } from "next/server"
import { env } from "@/env"
import type { CapxResponse, CapxUser } from "@/lib/types/capx"

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1]
    if (!token) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 },
      )
    }

    // Get user details from Capx
    const response = await fetch(`${env.CAPX_API_URL}/users/details`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = (await response.json()) as CapxResponse<{ user: CapxUser }>
    if (!data.success) {
      return NextResponse.json(
        { success: false, error: "Failed to get user details" },
        { status: 401 },
      )
    }

    return NextResponse.json({
      success: true,
      user: data.result.user,
    })
  } catch (error) {
    console.error("Error getting user details:", error)
    return NextResponse.json(
      { success: false, error: "Failed to get user details" },
      { status: 500 },
    )
  }
}
