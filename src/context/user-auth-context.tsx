"use client"

import type React from "react"
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
import { jwtDecode } from "jwt-decode"
import { setTokenCookies } from "@/lib/utils/tokens"
import type { XIDTransactionDetails } from "@/lib/types/xid"

interface UserDetails {
  id: string
  email: string
  telegram_id: string
  isOnboarded: boolean
}

interface UserAuthContextType {
  user: UserDetails | null
  isLoading: boolean
  error: string | null
  login: () => Promise<void>
  logout: () => void
  isUserCreated: boolean
  getUserDetails: () => Promise<void>
  txDetails: XIDTransactionDetails | null
}

const AuthContext = createContext<UserAuthContextType | undefined>(undefined)

// Add type for JWT payload
interface CAPXAuthPayload {
  user: {
    id: string
    email: string
    telegram_id: string
  }
  exp: number
}

export function UserAuthContext({ children }: { children: React.ReactNode }) {
  const {
    isTelegramUserCreated,
    setTelegramUserCreated,
    setTelegramAccessToken,
  } = useTelegramState()
  const [user, setUser] = useState<UserDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [txDetails, setTxDetails] = useState<XIDTransactionDetails | null>(null)

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

      // Then authenticate with Capx
      const authResponse = await fetch("/api/telegram/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-initdata": verifyData.initData,
        },
      })

      const authData = await authResponse.json()

      if (authData.success) {
        setTokenCookies(
          authData.tokens.access_token,
          authData.tokens.refresh_token,
        )
        // Using jwt-decode as per requirements
        const decodedToken = jwtDecode<CAPXAuthPayload>(
          authData.tokens.access_token,
        )

        setUser({
          id: decodedToken.user.id,
          email: decodedToken.user.email,
          telegram_id: decodedToken.user.telegram_id,
          isOnboarded: authData.isOnboarded,
        })
        setTelegramUserCreated(true)
        setTelegramAccessToken(authData.tokens.access_token)
        setTxDetails(authData.signup_tx)
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Authentication failed")
    }
  }, [initDataRaw])

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
    <AuthContext.Provider
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
    </AuthContext.Provider>
  )
}

export const useUserAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useUserAuth must be used within a UserAuthContext")
  }
  return context
}
