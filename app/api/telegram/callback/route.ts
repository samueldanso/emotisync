import { NextResponse } from "next/server";
import { noStore } from "@/lib/utils/server";
import { checkOnboardingStatus } from "@/actions/profile";
import { env } from "@/env";
import { createUser } from "@/actions/user";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  noStore();
  try {
    const initData = request.headers.get("x-initdata");

    if (!initData) {
      return NextResponse.json(
        { success: false, error: "No init data provided" },
        { status: 400 }
      );
    }

    // Get user data from Capx
    const capxResponse = await fetch(`${env.CAPX_API_URL}/users/auth`, {
      method: "POST",
      headers: {
        "x-initdata": initData,
      },
    });

    const capxData = await capxResponse.json();

    if (!capxData?.result?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Failed to get user data" },
        { status: 401 }
      );
    }

    const telegramUser = capxData.result.user;

    const { error } = await createUser(
      `${telegramUser.id}@telegram.com`,
      uuidv4(),
      {
        auth_provider: "telegram",
        telegram_id: telegramUser.id.toString(),
        first_name: telegramUser.first_name,
        last_name: telegramUser.last_name || null,
      }
    );

    if (error) {
      return NextResponse.json(
        { success: false, error: error },
        { status: 500 }
      );
    }

    const { isOnboarded, error: profileError } = await checkOnboardingStatus(
      telegramUser.id
    );

    if (profileError) {
      return NextResponse.json(
        { success: false, error: profileError },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: telegramUser,
      tokens: {
        access_token: capxData.result.access_token,
        refresh_token: capxData.result.refresh_token,
      },
      isOnboarded,
      signup_tx: capxData.result.signup_tx,
    });
  } catch (error) {
    console.error("Error in telegram callback:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
