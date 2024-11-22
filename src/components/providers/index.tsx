"use client"

import dynamic from "next/dynamic"
import { UserAuthContext } from "@/context/user-auth-context"
import { ThemeProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import { getPlatform } from "@/lib/utils/client"

// Dynamically import providers
const TelegramSDKProvider = dynamic(
  () => import("@telegram-apps/sdk-react").then((mod) => mod.SDKProvider),
  { ssr: false },
)

const PrivyWalletProvider = dynamic(
  () => import("@/context/privy-provider").then((mod) => mod.default),
  { ssr: false },
)

export function Providers({ children, ...props }: ThemeProviderProps) {
  const platform = getPlatform()

  // Base content without Privy
  const baseContent = (
    <UserAuthContext>
      <ThemeProvider {...props}>{children}</ThemeProvider>
    </UserAuthContext>
  )

  // Only add Privy and Telegram SDK for telegram platform
  if (platform === "telegram") {
    return (
      <TelegramSDKProvider
        acceptCustomStyles
        debug
        onError={(error) => {
          console.error("Telegram SDK error:", error)
        }}
      >
        <UserAuthContext>
          <PrivyWalletProvider>
            <ThemeProvider {...props}>{children}</ThemeProvider>
          </PrivyWalletProvider>
        </UserAuthContext>
      </TelegramSDKProvider>
    )
  }

  return baseContent
}

export default Providers
