"use client"

import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  reset: () => void
}

export function JournalError({ reset }: ErrorBoundaryProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <p className="text-muted-foreground">Failed to load journals</p>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </div>
  )
}
