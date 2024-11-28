"use client"
import { Spinner } from "@/components/ui/spinner"

export default function JournalsLoading() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <Spinner className="h-10 w-10 text-muted-foreground" />
    </div>
  )
}
