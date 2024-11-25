"use client"

import { useEffect } from "react"
import { useSessionStore } from "@/lib/stores/session-store"

interface TimerProps {
  onTimeWarning: () => void
  onTimeEnd: () => void
}

export function Timer({ onTimeWarning, onTimeEnd }: TimerProps) {
  const { timeRemaining, setTimeRemaining } = useSessionStore()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(timeRemaining - 1)

      // Check for 1-minute warning (at 60 seconds)
      if (timeRemaining === 60) {
        onTimeWarning()
      }
      // Check for end
      if (timeRemaining === 1) {
        onTimeEnd()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining, onTimeWarning, onTimeEnd, setTimeRemaining])

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  )
}
