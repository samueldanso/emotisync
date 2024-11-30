"use client"

import { useEffect } from "react"
import { SDKProvider } from "@telegram-apps/sdk-react"
import { usePathname } from "next/navigation"

export default function TelegramLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    // Get Telegram WebApp instance
    const tg = window.Telegram?.WebApp

    // Handle back button visibility
    if (tg) {
      if (pathname !== "/") {
        tg.BackButton.show()
        tg.BackButton.onClick(() => {
          window.history.back()
        })
      } else {
        tg.BackButton.hide()
      }

      // Cleanup
      return () => {
        tg.BackButton.offClick()
      }
    }
  }, [pathname])

  return (
    <SDKProvider acceptCustomStyles debug>
      <div className="flex min-h-screen flex-col bg-background">
        <main className="flex-1">{children}</main>
      </div>
    </SDKProvider>
  )
}
