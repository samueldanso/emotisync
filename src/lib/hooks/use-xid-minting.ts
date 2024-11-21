"use client"

import { useCallback } from "react"
import { useWallets } from "@privy-io/react-auth"
import { ethers } from "ethers"
import { useTelegramAuth } from "@/context/telegram-auth"
import { env } from "@/env"
import type { XIDTransactionDetails } from "@/lib/types/xid"

export function useXIDMinting() {
  const { wallets } = useWallets()
  const { getUserDetails } = useTelegramAuth()

  const mintXId = useCallback(
    async (txDetails: XIDTransactionDetails) => {
      if (!txDetails || Object.keys(txDetails).length === 0) return false

      try {
        await fetch("/api/telegram/faucet", { method: "POST" })

        const wallet = wallets.find((w) => w.walletClientType === "privy")
        if (!wallet) throw new Error("No wallet found")

        const chainId = env.NEXT_PUBLIC_CAPX_CHAIN_ID || "10245"
        await wallet.switchChain(chainId)
        const provider = await wallet.getEthersProvider()
        const signer = provider.getSigner()

        const contract = new ethers.Contract(
          txDetails.contract_address,
          txDetails.contract_abi,
          signer,
        )

        const tx = await signer.sendTransaction({
          to: txDetails.contract_address,
          data: contract.interface.encodeFunctionData("createProfile", [
            txDetails.input_params._profileParams,
            txDetails.input_params._profileData,
          ]),
          chainId: Number(chainId),
        })

        await tx.wait()
        await getUserDetails()
        return true
      } catch (error) {
        console.error("XID minting error:", error)
        return false
      }
    },
    [wallets, getUserDetails],
  )

  return { mintXId }
}
