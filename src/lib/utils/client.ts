"use client";

export const Platform = {
  WEB: "web",
  TELEGRAM: "telegram",
} as const;

export type PlatformType = (typeof Platform)[keyof typeof Platform];

export function getPlatform(): PlatformType {
  if (typeof window === "undefined") return Platform.WEB;

  // Better Telegram detection
  const isTelegramWebApp = Boolean(
    // @ts-ignore
    window?.Telegram?.WebApp ||
      window?.TelegramWebviewProxy || // Add this check
      window.location.href.includes("tg://") || // Add this check
      window.location.href.includes("t.me")
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
