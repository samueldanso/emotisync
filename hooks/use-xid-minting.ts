"use client"

import { useCallback } from "react"
import { useWallets } from "@privy-io/react-auth"
import type { XIDTransactionDetails } from "@/lib/types/xid"
import { env } from "@/env"
import { Contract } from "ethers"

export function useXIDMinting() {
  // 1. Get wallets from Privy
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
        try {
          await wallet.switchChain(env.NEXT_PUBLIC_CAPX_CHAIN_ID)
        } catch (error) {
          console.error("Chain switch error:", error)
          throw new Error("Failed to switch chain")
        }

        // Get provider and signer
        const provider = await wallet.getEthersProvider()
        const signer = provider.getSigner()

        // Create contract instance
        const contract = new Contract(
          txDetails.contract_address,
          txDetails.contract_abi,
          signer,
        )

        // Encode function data
        const data = contract.interface.encodeFunctionData("createProfile", [
          txDetails.input_params._profileParams,
          txDetails.input_params._profileData,
        ])

        // Create profile transaction
        const tx = await signer.sendTransaction({
          to: txDetails.contract_address,
          data,
          chainId: Number(env.NEXT_PUBLIC_CAPX_CHAIN_ID),
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

  return { mintXId }
}
