"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface TelegramActionProps {
  text: string
  onClick: () => void
  children?: React.ReactNode
}

export function TelegramAction({
  text,
  onClick,
  children,
}: TelegramActionProps) {
  const tg = window.Telegram?.WebApp

  useEffect(() => {
    // If in Telegram, use native MainButton
    if (tg?.MainButton) {
      tg.MainButton.setText(text)
      tg.MainButton.show()
      tg.MainButton.onClick(onClick)

      return () => {
        tg.MainButton.offClick()
        tg.MainButton.hide()
      }
    }
  }, [tg, text, onClick])

  // If not in Telegram, render normal button
  if (!tg) {
    return <Button onClick={onClick}>{children || text}</Button>
  }

  // In Telegram, don't render anything (using native button)
  return null
}
