"use client"

import type React from "react"
import { useCallback, useEffect } from "react"
import { defineChain } from "viem"
import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth"
import { env } from "@/env"
import { useTelegramState } from "@/hooks/use-telegram-state"

const Capx = defineChain({
  id: Number(env.NEXT_PUBLIC_CAPX_CHAIN_ID || "10245"),
  name: env.NEXT_PUBLIC_CAPX_CHAIN_NETWORK_NAME || "Capx Testnet",
  network: env.NEXT_PUBLIC_CAPX_CHAIN_NETWORK_NAME || "Capx Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ether",
    symbol: env.NEXT_PUBLIC_CAPX_CHAIN_CURRENCY || "GAS",
  },
  rpcUrls: {
    default: {
      http: [
        env.NEXT_PUBLIC_CAPX_CHAIN_RPC_URL ||
          "https://capx-testnet.alt.technology/",
      ],
      webSocket: [
        env.NEXT_PUBLIC_CAPX_WEB_SOCKET_URL ||
          "wss://capx-testnet.alt.technology/ws",
      ],
    },
    public: {
      http: [
        env.NEXT_PUBLIC_CAPX_CHAIN_RPC_URL ||
          "https://capx-testnet.alt.technology/",
      ],
      webSocket: [
        env.NEXT_PUBLIC_CAPX_WEB_SOCKET_URL ||
          "wss://capx-testnet.alt.technology/ws",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: env.NEXT_PUBLIC_CAPX_CHAIN_EXPLORE_URL || "https://capxscan.com/",
    },
  },
})

const PrivyWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { wallets } = useWallets()
  const { authenticated, createWallet, user: privyUser } = usePrivy()

  useEffect(() => {
    if (authenticated && !privyUser?.wallet) {
      createWallet().catch(console.error)
    }
  }, [authenticated, privyUser?.wallet, createWallet])

  return <>{wallets.length > 0 ? children : <div>Loading wallet...</div>}</>
}

export default function PrivyWalletProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { isTelegramUserCreated, telegramAccessToken } = useTelegramState()

  const getCustomToken = useCallback(async () => {
    if (!isTelegramUserCreated) return undefined
    return telegramAccessToken || undefined
  }, [isTelegramUserCreated, telegramAccessToken])

  return (
    <PrivyProvider
      appId={env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        supportedChains: [Capx],
        defaultChain: Capx,
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",
          logo: "/emotisync-icon.svg",
          showWalletLoginFirst: false,
        },
        customAuth: {
          enabled: isTelegramUserCreated,
          isLoading: false,
          getCustomAccessToken: getCustomToken,
        },
      }}
    >
      <PrivyWrapper>{children}</PrivyWrapper>
    </PrivyProvider>
  )
}
