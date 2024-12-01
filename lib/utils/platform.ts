"use client"

export enum Platform {
  WEB = "web",
  TELEGRAM = "telegram",
}

export function getPlatform(): Platform {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return Platform.WEB
  }

  // Check if we're in Telegram WebApp
  const isTelegramWebApp = Boolean(window?.Telegram?.WebApp)
  const hasInitData = window.location.search.includes("tgWebAppData")
  const isDev = process.env.NODE_ENV === "development"

  // In development, allow platform override
  if (isDev && window.location.search.includes("platform=telegram")) {
    return Platform.TELEGRAM
  }

  // In production, check for actual Telegram WebApp
  if (!isDev && (isTelegramWebApp || hasInitData)) {
    return Platform.TELEGRAM
  }

  return Platform.WEB
}

// Helper functions
export function isTelegramWebApp(): boolean {
  return getPlatform() === Platform.TELEGRAM
}

export function isWebBrowser(): boolean {
  return getPlatform() === Platform.WEB
}
