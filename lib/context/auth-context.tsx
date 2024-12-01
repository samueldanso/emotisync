"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { api } from "@/lib/utils/api"
import { getTokens, removeTokens, setTokens } from "@/lib/utils/cookies"
import type { CapxUser } from "@/lib/types/capx"

interface AuthContextType {
  user: CapxUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (accessToken: string, refreshToken: string) => void
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CapxUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const response = await api.get<CapxUser>("/users/me")
      setUser(response.result)
      return response.result
    } catch (error) {
      console.error("Failed to fetch user:", error)
      removeTokens()
      setUser(null)
      throw error
    }
  }

  const login = (accessToken: string, refreshToken: string) => {
    setTokens(accessToken, refreshToken)
    void fetchUser()
  }

  const logout = () => {
    removeTokens()
    setUser(null)
  }

  const refreshUser = async () => {
    setIsLoading(true)
    try {
      await fetchUser()
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const tokens = getTokens()
    if (tokens.accessToken && tokens.refreshToken) {
      void refreshUser()
    } else {
      setIsLoading(false)
    }
  }, [])

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
