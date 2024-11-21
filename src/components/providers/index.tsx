"use client"

import dynamic from "next/dynamic"
import { UserAuthContext } from "@/context/user-auth-context"
import PrivyWalletProvider from "@/context/privy-provider"
import { ThemeProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import type { SDKError } from "@telegram-apps/sdk-react"

// Dynamically import SDKProvider with no SSR
const TelegramSDKProvider = dynamic(
  () => import("@telegram-apps/sdk-react").then((mod) => mod.SDKProvider),
  { ssr: false },
)

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <TelegramSDKProvider
      acceptCustomStyles
      debug
      onError={(error: SDKError) => {
        console.error("Telegram SDK error:", {
          code: error.code,
          message: error.message,
          details: error.details,
        })
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

export default Providers
