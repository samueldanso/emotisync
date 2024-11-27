"use client"

import dynamic from "next/dynamic"
import { UserAuthContext } from "@/contexts/user-auth-context"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { getPlatform } from "@/lib/utils/platform"

// Dynamically import providers
const TelegramSDKProvider = dynamic(
  () => import("@telegram-apps/sdk-react").then((mod) => mod.SDKProvider),
  { ssr: false },
)

const PrivyWalletProvider = dynamic(
  () => import("@/contexts/privy-provider").then((mod) => mod.default),
  { ssr: false },
)

export function Providers({ children, ...props }: ThemeProviderProps) {
  const platform = getPlatform()

  // Base content without Privy
  const baseContent = (
    <UserAuthContext>
      <NextThemeProvider {...props}>{children}</NextThemeProvider>
    </UserAuthContext>
  )

  // Only add Privy and Telegram SDK for telegram platform
  if (platform === "telegram") {
    return (
      <TelegramSDKProvider>
        <UserAuthContext>
          <PrivyWalletProvider>
            <NextThemeProvider {...props}>{children}</NextThemeProvider>
          </PrivyWalletProvider>
        </UserAuthContext>
      </TelegramSDKProvider>
    )
  }

  return baseContent
}

export default Providers
