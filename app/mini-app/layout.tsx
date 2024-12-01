"use client"

import { MiniAppProviders } from "./providers"

export default function MiniAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MiniAppProviders>{children}</MiniAppProviders>
}
