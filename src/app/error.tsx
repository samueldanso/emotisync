"use client"

import { Button } from "@/components/ui/button"
import { getErrorMessage } from "@/lib/utils/errors"

export default function NextError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 flex w-full max-w-[432px] flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <h2 className="font-semibold text-2xl">Something went wrong!</h2>
          <p className="text-muted-foreground">{getErrorMessage(error)}</p>
          <Button onClick={() => reset()} type="button">
            Try again
          </Button>
        </div>
      </div>
    </div>
  )
}
