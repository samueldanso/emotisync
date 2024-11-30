"use client"

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/navigation"
import { useTelegramState } from "@/hooks/use-telegram-state"
import { useXIDMinting } from "@/hooks/use-xid-minting"
import { setTokenCookies } from "@/lib/utils/cookies"
import type { UserDetails } from "@/lib/types/user"
import Cookies from "js-cookie"
import { refreshCapXToken } from "@/lib/utils/token-refresh"

interface UserAuthContextType {
  user: UserDetails | null
  isLoading: boolean
  error: string | null
  login: (initDataRaw?: string) => Promise<void>
  logout: () => void
  isUserCreated: boolean
}

const AuthContext = createContext<UserAuthContextType | undefined>(undefined)

export function UserAuthContext({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<UserDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { mintXId } = useXIDMinting()
  const {
    isTelegramUserCreated,
    setTelegramUserCreated,
    setTelegramAccessToken,
  } = useTelegramState()

  const handleTelegramAuth = async (initDataRaw: string) => {
    try {
      // Verify init data
      const verifyResponse = await fetch("/api/telegram/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData: initDataRaw }),
      })

      const verifyData = await verifyResponse.json()
      if (!verifyData.success) throw new Error("Verification failed")

      // Authenticate with CapX
      const authResponse = await fetch("/api/telegram/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-initdata": verifyData.initData,
        },
      })

      const authData = await authResponse.json()
      if (!authData.success) throw new Error("Auth failed")

      // Set tokens and user data
      setTokenCookies(
        authData.tokens.access_token,
        authData.tokens.refresh_token,
      )

      setUser(authData.user)
      setTelegramAccessToken(authData.tokens.access_token)
      setTelegramUserCreated(true)

      // Handle xID minting if needed
      if (authData.signup_tx) {
        if (mintXId) {
          const mintingSuccess = await mintXId(authData.signup_tx)
          if (!mintingSuccess) {
            throw new Error("Failed to mint xID")
          }
        }
      }

      // Redirect based on onboarding status
      if (!authData.user.onboarding_completed) {
        router.push("/profile")
      } else {
        router.push("/chat")
      }
    } catch (error) {
      console.error("Auth error:", error)
      setError(error instanceof Error ? error.message : "Auth failed")
    }
  }

  const login = useCallback(async (initDataRaw?: string) => {
    setIsLoading(true)
    try {
      if (!initDataRaw) throw new Error("No init data provided")
      await handleTelegramAuth(initDataRaw)
    } catch (error) {
      console.error("Login error:", error)
      setError(error instanceof Error ? error.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setTelegramUserCreated(false)
    setTelegramAccessToken(null)
    document.cookie =
      "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie =
      "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/")
  }, [router])

  useEffect(() => {
    // Check token expiry every minute
    const interval = setInterval(async () => {
      const refreshToken = Cookies.get("refresh_token")
      if (refreshToken) {
        try {
          const tokens = await refreshCapXToken(refreshToken)
          setTokenCookies(tokens.access_token, tokens.refresh_token)
        } catch (_error) {
          // Token refresh failed, logout user
          logout()
        }
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [logout])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        isUserCreated: isTelegramUserCreated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useUserAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useUserAuth must be used within UserAuthContext")
  }
  return context
}
