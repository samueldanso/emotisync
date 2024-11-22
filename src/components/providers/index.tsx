"use client"

import dynamic from "next/dynamic"
import { UserAuthContext } from "@/context/user-auth-context"
import PrivyWalletProvider from "@/context/privy-provider"
import { ThemeProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import { getPlatform } from "@/lib/utils/client"

// Dynamically import SDKProvider with no SSR
const TelegramSDKProvider = dynamic(
  () => import("@telegram-apps/sdk-react").then((mod) => mod.SDKProvider),
  { ssr: false },
)

export function Providers({ children, ...props }: ThemeProviderProps) {
  const platform = getPlatform()

  const content = (
    <UserAuthContext>
      <PrivyWalletProvider>
        <ThemeProvider {...props}>{children}</ThemeProvider>
      </PrivyWalletProvider>
    </UserAuthContext>
  )

  if (platform === "telegram") {
    return (
      <TelegramSDKProvider
        acceptCustomStyles
        debug
        onError={(error) => {
          console.error("Telegram SDK error:", error)
        }}
      >
        {content}
      </TelegramSDKProvider>
    )
  }

  return content
}

export default Providers
