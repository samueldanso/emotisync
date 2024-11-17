"use client"

import { Logo } from "@/components/ui/logo"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Logo className="mb-8 h-12 w-12 animate-pulse" />
      <div className="w-full max-w-[440px] space-y-4">
        <div className="h-8 w-full animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted/50" />
      </div>
    </div>
  )
}
