"use client"

import { StrictMode } from "react"
import dynamic from "next/dynamic"
import { SDKProvider } from "@telegram-apps/sdk-react"
import { CapxAuthProvider } from "./contexts/capx-auth"
import PrivyWalletProvider from "./contexts/privy-provider"

// Dynamically import the real component with no SSR
const TelegramApp = dynamic(() => import("./telegram-app"), {
  ssr: false,
  loading: () => null,
})

export default function Page() {
  return (
    <StrictMode>
      <SDKProvider acceptCustomStyles debug>
        <CapxAuthProvider>
          <PrivyWalletProvider>
            <TelegramApp />
          </PrivyWalletProvider>
        </CapxAuthProvider>
      </SDKProvider>
    </StrictMode>
  )
}
