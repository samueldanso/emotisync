"use client"

import { create } from "zustand"

interface TelegramState {
  isTelegramUserCreated: boolean
  setTelegramUserCreated: (value: boolean) => void
  telegramAccessToken: string | null
  setTelegramAccessToken: (token: string | null) => void
}

export const useTelegramState = create<TelegramState>((set) => ({
  isTelegramUserCreated: false,
  setTelegramUserCreated: (value) => set({ isTelegramUserCreated: value }),
  telegramAccessToken: null,
  setTelegramAccessToken: (token) => set({ telegramAccessToken: token }),
}))
