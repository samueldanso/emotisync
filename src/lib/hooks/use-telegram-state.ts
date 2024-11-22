"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TelegramState {
  isTelegramUserCreated: boolean
  telegramAccessToken: string | null
  setTelegramUserCreated: (value: boolean) => void
  setTelegramAccessToken: (token: string | null) => void
  reset: () => void
}

export const useTelegramState = create<TelegramState>()(
  persist(
    (set) => ({
      isTelegramUserCreated: false,
      telegramAccessToken: null,
      setTelegramUserCreated: (value) => set({ isTelegramUserCreated: value }),
      setTelegramAccessToken: (token) => set({ telegramAccessToken: token }),
      reset: () =>
        set({ isTelegramUserCreated: false, telegramAccessToken: null }),
    }),
    {
      name: "telegram-auth-store",
    },
  ),
)
