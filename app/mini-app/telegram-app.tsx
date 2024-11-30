"use client"

import { PrivyProvider } from "@privy-io/react-auth"
import { env } from "@/env"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLaunchParams } from "@telegram-apps/sdk-react"
import { useUserAuth } from "@/contexts/user-auth-context"
import { Spinner } from "@/components/ui/spinner"

export default function TelegramApp() {
  return (
    <PrivyProvider appId={env.NEXT_PUBLIC_PRIVY_APP_ID}>
      <TelegramContent />
    </PrivyProvider>
  )
}

// Separate component for the content
function TelegramContent() {
  const router = useRouter()
  const { initDataRaw } = useLaunchParams()
  const { login, isLoading, error, user, isUserCreated } = useUserAuth()
  const tg = (window as any).Telegram?.WebApp

  // Handle initial auth
  useEffect(() => {
    if (initDataRaw) {
      login(initDataRaw)
    }
  }, [initDataRaw, login])

  // Handle user flow and redirections
  useEffect(() => {
    if (isUserCreated && user) {
      // Show loading state in Telegram UI
      if (tg?.MainButton) {
        tg.MainButton.setText("Loading...")
        tg.MainButton.show()
      }

      // Check if user needs onboarding
      if (!user.onboarding_completed) {
        router.push("/profile")
      } else {
        router.push("/chat")
      }
    }
  }, [isUserCreated, user, router, tg])

  // Handle errors
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h1 className="font-semibold text-destructive text-xl">
            Authentication Failed
          </h1>
          <p className="mt-2 text-muted-foreground">{error}</p>
          {tg && (
            <button
              type="button"
              onClick={() => tg.close()}
              className="mt-4 text-brand-primary text-sm"
            >
              Close Mini App
            </button>
          )}
        </div>
      </div>
    )
  }

  // Loading state
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        {isLoading ? (
          <>
            <Spinner className="h-8 w-8" />
            <p className="mt-4 text-muted-foreground">
              Initializing your AI companion...
            </p>
          </>
        ) : (
          <p className="text-muted-foreground">
            Waiting for Telegram authentication...
          </p>
        )}
      </div>
    </div>
  )
}
