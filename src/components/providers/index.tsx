"use client"

import { SDKProvider } from "@telegram-apps/sdk-react"
import { UserAuthContext } from "@/context/user-auth-context"
import PrivyWalletProvider from "@/context/privy-provider"
import { ThemeProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import type { SDKError } from "@telegram-apps/sdk-react"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SDKProvider
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
    </SDKProvider>
  )
}

export default Providers
