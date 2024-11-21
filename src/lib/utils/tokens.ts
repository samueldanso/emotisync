"use client"

import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"

export function setTokenCookies(accessToken?: string, refreshToken?: string) {
  if (accessToken) {
    const decodedAccessToken = jwtDecode(accessToken)
    const accessTokenExpiry = decodedAccessToken.exp
    const accessTokenExpiresInMs = (accessTokenExpiry || 0) * 1000 - Date.now()
    const accessTokenExpiresInDays =
      accessTokenExpiresInMs / (1000 * 60 * 60 * 24)

    Cookies.set("access_token", accessToken, {
      expires: accessTokenExpiresInDays,
      secure: true,
      sameSite: "Strict",
    })
  }

  if (refreshToken) {
    const decodedRefreshToken = jwtDecode(refreshToken)
    const refreshTokenExpiry = decodedRefreshToken.exp
    const refreshTokenExpiresInMs =
      (refreshTokenExpiry || 0) * 1000 - Date.now()
    const refreshTokenExpiresInDays =
      refreshTokenExpiresInMs / (1000 * 60 * 60 * 24)

    Cookies.set("refresh_token", refreshToken, {
      expires: refreshTokenExpiresInDays,
      secure: true,
      sameSite: "Strict",
    })
  }
}
