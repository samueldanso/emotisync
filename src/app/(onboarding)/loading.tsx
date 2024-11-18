"use client"

import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Image
        src="/emotisync-icon.svg"
        alt="EmotiSync"
        width={48}
        height={48}
        className="mb-8 h-12 w-12 animate-pulse"
        priority
      />
      <div className="w-full max-w-[440px] space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}
