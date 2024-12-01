"use client"
import dynamic from "next/dynamic"
import { Spinner } from "@/components/ui/spinner"

// Dynamically import the real component with no SSR
const TelegramApp = dynamic(() => import("./telegram-app"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  ),
})

export default function Page() {
  return <TelegramApp />
}
