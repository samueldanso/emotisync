interface TelegramWebApp {
  BackButton: {
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
    offClick: () => void
  }
  MainButton: {
    show: () => void
    hide: () => void
    setText: (text: string) => void
    onClick: (callback: () => void) => void
    offClick: () => void
    showProgress: () => void
    hideProgress: () => void
  }
  ready: () => void
  close: () => void
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp
  }
}
