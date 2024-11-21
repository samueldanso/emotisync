"use client"

import { Logo } from "@/components/ui/logo"
import { cn } from "@/lib/utils/client"

export default function Loading() {
  return (
    <div
      className={cn("flex min-h-screen flex-col items-center justify-center")}
    >
      <div className="flex flex-col items-center space-y-8">
        <Logo className="h-12 w-12 animate-pulse" />
        <div className="space-y-6">
          <div className="h-8 w-48 rounded-md bg-muted" />
          <div className="h-4 w-full max-w-md rounded-md bg-muted" />
          <div className="grid gap-4">
            <div className="h-32 w-full rounded-lg bg-muted" />
          </div>
        </div>
      </div>
    </div>
  )
}
