"use client"

import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"

interface TokenData {
  accessToken?: string
  refreshToken?: string
}

export function setTokens(accessToken?: string, refreshToken?: string) {
  if (accessToken) {
    const decodedAccessToken = jwtDecode(accessToken) as { exp: number }
    const accessTokenExpiry = decodedAccessToken.exp // Unix timestamp (seconds)

    // Calculate expiration in days
    const accessTokenExpiresInMs = accessTokenExpiry * 1000 - Date.now()
    const accessTokenExpiresInDays =
      accessTokenExpiresInMs / (1000 * 60 * 60 * 24)

    Cookies.set("access_token", accessToken, {
      expires: accessTokenExpiresInDays,
      secure: true,
      sameSite: "Strict",
    })
  }

  if (refreshToken) {
    const decodedRefreshToken = jwtDecode(refreshToken) as { exp: number }
    const refreshTokenExpiry = decodedRefreshToken.exp

    const refreshTokenExpiresInMs = refreshTokenExpiry * 1000 - Date.now()
    const refreshTokenExpiresInDays =
      refreshTokenExpiresInMs / (1000 * 60 * 60 * 24)

    Cookies.set("refresh_token", refreshToken, {
      expires: refreshTokenExpiresInDays,
      secure: true,
      sameSite: "Strict",
    })
  }
}

export function getTokens(): TokenData {
  return {
    accessToken: Cookies.get("access_token"),
    refreshToken: Cookies.get("refresh_token"),
  }
}

export function removeTokens() {
  Cookies.remove("access_token")
  Cookies.remove("refresh_token")
}
