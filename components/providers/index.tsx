"use client"

import { Toaster } from "sonner"
import { UserAuthContext } from "@/contexts/user-auth-context"
import { ThemeProvider } from "next-themes"
import { PrivyProvider } from "@privy-io/react-auth"
import { env } from "@/env"
import { SDKProvider } from "@telegram-apps/sdk-react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SDKProvider acceptCustomStyles debug>
        <UserAuthContext>
          <PrivyProvider appId={env.NEXT_PUBLIC_PRIVY_APP_ID}>
            {children}
            <Toaster />
          </PrivyProvider>
        </UserAuthContext>
      </SDKProvider>
    </ThemeProvider>
  )
}
