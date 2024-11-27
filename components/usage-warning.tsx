"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Button } from "./ui/button"
import Link from "next/link"

interface UsageWarningProps {
  message: string
  resetAt: Date
}

export function UsageWarning({ message, resetAt }: UsageWarningProps) {
  return (
    <Alert variant="destructive" className="max-w-xl">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Usage Limit Reached</AlertTitle>
      <AlertDescription className="mt-2">
        <p>{message}</p>
        <p className="mt-2 text-muted-foreground text-sm">
          Your limit resets on {resetAt.toLocaleDateString()} at{" "}
          {resetAt.toLocaleTimeString()}
        </p>
        <Button asChild className="mt-4" variant="secondary">
          <Link href="/pricing">Upgrade for unlimited access</Link>
        </Button>
      </AlertDescription>
    </Alert>
  )
}
