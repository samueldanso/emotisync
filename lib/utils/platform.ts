"use client"

export const Platform = {
  WEB: "web",
  TELEGRAM: "telegram",
} as const

export type PlatformType = (typeof Platform)[keyof typeof Platform]

export function getPlatform(): PlatformType {
  if (typeof window === "undefined") return Platform.WEB

  // Debug logging
  console.log("WebApp Object:", window?.Telegram?.WebApp)
  console.log("Search Params:", window.location.search)
  console.log("User Agent:", window.navigator.userAgent)

  const userAgent = window.navigator.userAgent.toLowerCase()

  // Check for Telegram Mini App environment
  const isTelegramWebApp = Boolean(
    // @ts-ignore - Telegram WebApp global object
    window?.Telegram?.WebApp ||
      // Check for Telegram init data in URL
      window.location.search.includes("tgWebAppData=") ||
      // Check for Telegram in user agent
      userAgent.includes("telegram"),
  )

  console.log("Is Telegram WebApp:", isTelegramWebApp)

  return isTelegramWebApp ? Platform.TELEGRAM : Platform.WEB
}

// Helper functions
export function isTelegramWebApp(): boolean {
  return getPlatform() === Platform.TELEGRAM
}

export function isWebBrowser(): boolean {
  return getPlatform() === Platform.WEB
}
