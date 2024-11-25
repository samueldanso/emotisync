"use client"

import { useCallback } from "react"
import { useWallets } from "@privy-io/react-auth"
import { ethers } from "ethers"
import { useUserAuth } from "@/context/user-auth-context"
import { env } from "@/env"
import type { XIDTransactionDetails } from "@/lib/types/xid"

export function useXIDMinting() {
  const { wallets } = useWallets()
  const { getUserDetails } = useUserAuth()

  const mintXId = useCallback(
    async (txDetails: XIDTransactionDetails) => {
      if (!txDetails || Object.keys(txDetails).length === 0) return false

      try {
        const faucetResponse = await fetch("/api/telegram/faucet", {
          method: "POST",
        })
        if (!faucetResponse.ok) {
          throw new Error("Faucet request failed")
        }

        const wallet = wallets.find((w) => w.walletClientType === "privy")
        if (!wallet) throw new Error("No wallet found")

        const chainId = env.NEXT_PUBLIC_CAPX_CHAIN_ID || "10245"
        try {
          await wallet.switchChain(chainId)
        } catch (error) {
          console.error("Chain switch error:", error)
          throw new Error("Failed to switch chain")
        }

        const provider = await wallet.getEthersProvider()
        const signer = provider.getSigner()

        const code = await provider.getCode(txDetails.contract_address)
        if (code === "0x") throw new Error("Invalid contract address")

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

        const receipt = await tx.wait()
        if (receipt.status !== 1) {
          throw new Error("Transaction failed")
        }

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
