"use client";

export const Platform = {
  WEB: "web",
  TELEGRAM: "telegram",
} as const;

export type PlatformType = (typeof Platform)[keyof typeof Platform];

export function getPlatform(): PlatformType {
  if (typeof window === "undefined") return Platform.WEB;

  // Check for Telegram Mini App environment
  const isTelegramWebApp = Boolean(
    // @ts-ignore - Telegram WebApp global object
    window?.Telegram?.WebApp ||
      // Check for Telegram init data in URL
      window.location.search.includes("tgWebAppData=") ||
      // Check for Telegram WebApp user agent
      window.navigator.userAgent.includes("TelegramWebApp")
  );

  return isTelegramWebApp ? Platform.TELEGRAM : Platform.WEB;
}

// Helper functions
export function isTelegramWebApp(): boolean {
  return getPlatform() === Platform.TELEGRAM;
}

export function isWebBrowser(): boolean {
  return getPlatform() === Platform.WEB;
}
