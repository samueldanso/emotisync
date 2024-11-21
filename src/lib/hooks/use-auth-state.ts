"use client"

import { create } from "zustand"

interface AuthState {
  isUserCreated: boolean
  setUserCreated: (value: boolean) => void
  accessToken: string | null
  setAccessToken: (token: string | null) => void
}

export const useAuthState = create<AuthState>((set) => ({
  isUserCreated: false,
  setUserCreated: (value) => set({ isUserCreated: value }),
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
}))
