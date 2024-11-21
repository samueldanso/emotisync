"use client"

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useLaunchParams } from "@telegram-apps/sdk-react"
import { useRouter } from "next/navigation"
import { useTelegramState } from "@/lib/hooks/use-telegram-state"

interface TelegramUser {
  id: string
  email: string
  telegram_id: string
  isOnboarded: boolean
}

interface TelegramAuthContext {
  user: TelegramUser | null
  isLoading: boolean
  error: string | null
  login: () => Promise<void>
  logout: () => void
  isUserCreated: boolean
  getUserDetails: () => Promise<void>
  txDetails: any
}

const TelegramAuthContext = createContext<TelegramAuthContext | undefined>(
  undefined,
)

export function TelegramAuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    isTelegramUserCreated,
    setTelegramUserCreated,
    setTelegramAccessToken,
  } = useTelegramState()
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [txDetails, setTxDetails] = useState<any>(null)

  const initDataRaw = useLaunchParams()?.initDataRaw

  const login = useCallback(async () => {
    if (!initDataRaw) {
      setError("No Telegram init data found")
      return
    }

    try {
      // First verify with our backend
      const verifyResponse = await fetch("/api/telegram/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData: initDataRaw }),
      })

      const verifyData = await verifyResponse.json()

      if (!verifyData.success) {
        throw new Error(verifyData.error || "Verification failed")
      }

      // Then authenticate with Capx
      const authResponse = await fetch("/api/telegram/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-initdata": verifyData.initData,
        },
      })

      const authData = await authResponse.json()

      if (!authData.success) {
        throw new Error(authData.error || "Authentication failed")
      }

      // Set cookies for tokens
      document.cookie = `access_token=${authData.tokens.access_token}; path=/; secure; samesite=strict`
      document.cookie = `refresh_token=${authData.tokens.refresh_token}; path=/; secure; samesite=strict`

      setUser({
        id: authData.user.id,
        email: authData.user.email,
        telegram_id: authData.user.telegram_id,
        isOnboarded: authData.isOnboarded,
      })
      setTxDetails(authData.signup_tx)
      setTelegramUserCreated(true)
      setTelegramAccessToken(authData.tokens.access_token)

      // Redirect based on onboarding status
      if (!authData.isOnboarded) {
        router.push("/welcome/profile")
      } else {
        router.push("/app")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed")
    }
  }, [initDataRaw, router])

  const logout = useCallback(() => {
    // Clear cookies
    document.cookie =
      "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie =
      "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    setUser(null)
    router.push("/login")
  }, [router])

  const getUserDetails = useCallback(async () => {
    if (!user) return

    try {
      const response = await fetch("/api/telegram/user-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ telegram_id: user.telegram_id }),
      })

      const userDetails = await response.json()

      if (!userDetails.success) {
        throw new Error(userDetails.error || "Failed to fetch user details")
      }

      setUser({
        ...user,
        ...userDetails.user,
      })
    } catch (error) {
      console.error("Error getting user details:", error)
    }
  }, [user])

  useEffect(() => {
    if (initDataRaw && !user) {
      login()
    }
    setIsLoading(false)
  }, [initDataRaw, user, login])

  return (
    <TelegramAuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        txDetails,
        getUserDetails,
        isUserCreated: isTelegramUserCreated,
      }}
    >
      {children}
    </TelegramAuthContext.Provider>
  )
}

export const useTelegramAuth = () => {
  const context = useContext(TelegramAuthContext)
  if (context === undefined) {
    throw new Error(
      "useTelegramAuth must be used within a TelegramAuthProvider",
    )
  }
  return context
}
