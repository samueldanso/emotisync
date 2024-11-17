"use client"

import { Spinner } from "@/components/icons/spinner"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  )
}
