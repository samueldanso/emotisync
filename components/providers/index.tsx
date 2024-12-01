"use client"

import { Toaster } from "sonner"
import { ThemeProvider } from "next-themes"
import { SDKProvider } from "@telegram-apps/sdk-react"
import { PrivyProvider } from "@privy-io/react-auth"
import { UserAuthContext } from "@/contexts/user-auth-context"
import { env } from "@/env"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SDKProvider acceptCustomStyles debug>
        <PrivyProvider appId={env.NEXT_PUBLIC_PRIVY_APP_ID}>
          <UserAuthContext>
            {children}
            <Toaster />
          </UserAuthContext>
        </PrivyProvider>
      </SDKProvider>
    </ThemeProvider>
  )
}
