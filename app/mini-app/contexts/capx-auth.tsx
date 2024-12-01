"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useLaunchParams } from "@telegram-apps/sdk-react"
import { setTokens, getTokens } from "@/lib/utils/cookies"
import { isTelegramWebApp } from "@/lib/utils/platform"
import type { CapxUser } from "@/lib/types/capx"

interface CapxAuthState {
  user: CapxUser | null
  isLoading: boolean
  isAuthenticated: boolean
  txDetails: any
  refreshUser: () => Promise<void>
}

const CapxAuthContext = createContext<CapxAuthState | undefined>(undefined)

export function CapxAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CapxUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [txDetails, setTxDetails] = useState({})

  // Only use launch params in Telegram environment
  const initDataRaw = isTelegramWebApp() ? useLaunchParams()?.initDataRaw : null

  const createUser = useCallback(async (initData: string) => {
    try {
      const response = await fetch("/api/telegram/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-initdata": initData,
        },
      })

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || "Failed to create user")
      }

      setTokens(data.access_token, data.refresh_token)
      setUser(data.user)
      setTxDetails(data.signup_tx || {})
      return data
    } catch (error) {
      console.error("Create user error:", error)
      throw error
    }
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const { accessToken } = getTokens()
      if (!accessToken) {
        setUser(null)
        return
      }

      const response = await fetch("/api/telegram/user-details", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || "Failed to get user details")
      }

      setUser(data.user)
      setTxDetails(data.signup_tx || {})
    } catch (error) {
      console.error("Refresh user error:", error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isTelegramWebApp()) {
      // Not in Telegram environment, skip auth
      setIsLoading(false)
      return
    }

    if (!initDataRaw) {
      setIsLoading(false)
      return
    }
    ;(async () => {
      try {
        // Verify init data with our backend
        const response = await fetch("/api/telegram/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ initData: initDataRaw }),
        })

        const data = await response.json()
        if (!data.success) {
          throw new Error(data.error || "Failed to verify init data")
        }

        const { refreshToken } = getTokens()
        if (!refreshToken) {
          await createUser(data.initData)
        }
        await refreshUser()
      } catch (error) {
        console.error(
          "Auth error:",
          error instanceof Error ? error.message : "Unknown error",
        )
        setIsLoading(false)
      }
    })()
  }, [initDataRaw, createUser, refreshUser])

  return (
    <CapxAuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        txDetails,
        refreshUser,
      }}
    >
      {children}
    </CapxAuthContext.Provider>
  )
}

export function useCapxAuth() {
  const context = useContext(CapxAuthContext)
  if (!context) {
    throw new Error("useCapxAuth must be used within CapxAuthProvider")
  }
  return context
}
