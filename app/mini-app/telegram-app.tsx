"use client"

import { useCapxAuth } from "./contexts/capx-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Spinner } from "@/components/ui/spinner"

export default function TelegramApp() {
  const { user, isLoading, isAuthenticated } = useCapxAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      // Use onboarding_completed from CapX user
      if (!user.onboarding_completed) {
        router.push("/profile")
      } else {
        router.push("/chat")
      }
    }
  }, [isAuthenticated, user, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Please authenticate with Telegram
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="mr-2 h-6 w-6" />
      <p className="text-muted-foreground">Setting up your experience...</p>
    </div>
  )
}
