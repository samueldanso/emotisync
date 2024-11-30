"use client"

import { useCallback } from "react"
import { useWallets } from "@privy-io/react-auth"
import { getPlatform } from "@/lib/utils/platform"
import type { XIDTransactionDetails } from "@/lib/types/xid"

export function useXIDMinting() {
  // 1. Check if we're in browser
  if (typeof window === "undefined") {
    return { mintXId: null, handleMintingError: null }
  }

  // 2. Check platform
  const platform = getPlatform()
  if (platform !== "telegram") {
    return { mintXId: null, handleMintingError: null }
  }

  // 3. Only use wallets in client component for Telegram
  const { wallets } = useWallets()

  const mintXId = useCallback(
    async (txDetails: XIDTransactionDetails) => {
      if (!txDetails || Object.keys(txDetails).length === 0) return false

      try {
        // Request faucet tokens first
        const faucetResponse = await fetch("/api/telegram/faucet", {
          method: "POST",
        })
        if (!faucetResponse.ok) {
          throw new Error("Faucet request failed")
        }

        // Find Privy wallet
        const wallet = wallets.find((w) => w.walletClientType === "privy")
        if (!wallet) throw new Error("No wallet found")

        // Switch to CapX chain
        const chainId = process.env.NEXT_PUBLIC_CAPX_CHAIN_ID || "10245"
        try {
          await wallet.switchChain(chainId)
        } catch (error) {
          console.error("Chain switch error:", error)
          throw new Error("Failed to switch chain")
        }

        // Get provider and signer
        const provider = await wallet.getEthersProvider()
        const signer = provider.getSigner()

        // Create profile transaction
        const tx = await signer.sendTransaction({
          to: txDetails.contract_address,
          data: txDetails.contract_abi,
          chainId: Number(chainId),
        })

        const receipt = await tx.wait()
        if (receipt.status !== 1) {
          throw new Error("Transaction failed")
        }

        return true
      } catch (error) {
        console.error("XID minting error:", error)
        return false
      }
    },
    [wallets],
  )

  const handleMintingError = async (error: any) => {
    console.error("XID minting error:", error)

    // Retry logic for specific errors
    if (error.message.includes("insufficient funds")) {
      try {
        await fetch("/api/telegram/faucet", { method: "POST" })
        return false // Allow retry
      } catch (_faucetError) {
        throw new Error("Failed to get tokens from faucet")
      }
    }

    throw error
  }

  return { mintXId, handleMintingError }
}
