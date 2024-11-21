// Platform detection for auth flows
export function getPlatform(): "web" | "telegram" {
  if (typeof window === "undefined") return "web"
  return window.navigator.userAgent.includes("TelegramWebApp")
    ? "telegram"
    : "web"
}

// Check if running in Telegram WebApp
export function isTelegramWebApp(): boolean {
  return getPlatform() === "telegram"
}

// Check if running in web browser
export function isWebBrowser(): boolean {
  return getPlatform() === "web"
}
