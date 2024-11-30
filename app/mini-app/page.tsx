"use client"

import dynamic from "next/dynamic"

// Dynamically import the real component with no SSR
const TelegramApp = dynamic(() => import("./telegram-app"), {
  ssr: false,
  loading: () => null,
})

export default function Page() {
  return <TelegramApp />
}
