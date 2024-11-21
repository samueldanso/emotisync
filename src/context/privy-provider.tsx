"use client"

import { defineChain } from "viem"
import { useCallback, useEffect } from "react"
import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth"
import { env } from "@/env"
import { useTelegramAuth } from "./telegram-auth"

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
    },
    public: {
      http: [
        env.NEXT_PUBLIC_CAPX_CHAIN_RPC_URL ||
          "https://capx-testnet.alt.technology/",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url:
        env.NEXT_PUBLIC_CAPX_CHAIN_EXPLORE_URL ||
        "https://capx-testnet-explorer.alt.technology/",
    },
  },
})

const PrivyWrapper = ({ children }: { children: React.ReactNode }) => {
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
  const { isUserCreated } = useTelegramAuth()

  const getCustomToken = useCallback(async () => {
    if (!isUserCreated) return undefined
    const cookies = document.cookie.split(";")
    const accessToken = cookies
      .find((c) => c.trim().startsWith("access_token="))
      ?.split("=")[1]
    return accessToken || undefined
  }, [isUserCreated])

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
          enabled: true,
          isLoading: false,
          getCustomAccessToken: getCustomToken,
        },
      }}
    >
      <PrivyWrapper>{children}</PrivyWrapper>
    </PrivyProvider>
  )
}
