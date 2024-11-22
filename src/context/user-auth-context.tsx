"use client"

import { getPlatform } from "@/lib/utils/client"
import { useLaunchParams } from "@telegram-apps/sdk-react"
import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/navigation"
import { useTelegramState } from "@/lib/hooks/use-telegram-state"
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
  login: (initDataRaw?: string) => Promise<void>
  logout: () => void
  isUserCreated: boolean
  getUserDetails: () => Promise<void>
  txDetails: XIDTransactionDetails | null
}

const AuthContext = createContext<UserAuthContextType | undefined>(undefined)

export function UserAuthContext({ children }: { children: React.ReactNode }) {
  const platform = getPlatform()
  const router = useRouter()

  // Only use Telegram hooks in Telegram context
  const telegramParams = platform === "telegram" ? useLaunchParams() : null
  const initDataRaw = telegramParams?.initDataRaw

  const {
    isTelegramUserCreated,
    setTelegramUserCreated,
    setTelegramAccessToken,
  } = useTelegramState()
  const [user, setUser] = useState<UserDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [txDetails, _setTxDetails] = useState<XIDTransactionDetails | null>(
    null,
  )

  // Add this effect to handle routing
  useEffect(() => {
    if (platform === "telegram") {
      // Prevent Telegram users from seeing web routes
      const isWebRoute =
        window.location.pathname === "/" ||
        window.location.pathname.includes("/login") ||
        window.location.pathname.includes("/signup")

      if (isWebRoute) {
        // If user is authenticated, go to app or onboarding
        if (user) {
          if (!user.isOnboarded) {
            router.push("/welcome/profile")
          } else {
            router.push("/app")
          }
        } else {
          // If not authenticated, stay on current page for CAPX auth
          console.log("Waiting for CAPX auth...")
        }
      }
    }
  }, [platform, router, user])

  const handleWebAuth = async () => {
    // Your existing Supabase auth logic
  }

  const handleTelegramAuth = async (initDataRaw: string) => {
    if (!initDataRaw) {
      setError("No Telegram init data found")
      return
    }

    try {
      // 1. MAF retrieves init data ✅
      // Already have initDataRaw

      // 2. MAF sends init data to MAB for validation
      const verifyResponse = await fetch("/api/telegram/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData: initDataRaw }),
      })

      // 3. MAB validates and returns modified init data
      const verifyData = await verifyResponse.json()
      if (!verifyData.success) throw new Error("Verification failed")

      // 4. MAF sends to SAB
      const authResponse = await fetch("/api/telegram/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-initdata": verifyData.initData,
        },
      })

      // 5. SAB returns user details and JWT tokens
      const authData = await authResponse.json()
      if (!authData.success) throw new Error("Auth failed")

      // 6. Set tokens and handle user data
      setTokenCookies(
        authData.tokens.access_token,
        authData.tokens.refresh_token,
      )

      // 7. Initialize Privy only after successful auth
      if (authData.success) {
        setUser(authData.user)
        if (platform === "telegram") {
          setTelegramAccessToken(authData.tokens.access_token)
          setTelegramUserCreated(true)
        }
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Authentication failed")
    }
  }

  const auth = useCallback(
    async (initDataRaw?: string) => {
      if (platform === "telegram") {
        if (!initDataRaw) return
        return handleTelegramAuth(initDataRaw)
      }
      return handleWebAuth()
    },
    [platform],
  )

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
      auth(initDataRaw)
    }
    setIsLoading(false)
  }, [initDataRaw, user, auth])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login: auth,
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
