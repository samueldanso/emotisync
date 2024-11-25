"use client"

import { useEffect } from "react"
import { useSessionStore } from "@/lib/stores/session-store"

interface TimerProps {
  onTimeWarning: () => void
  onTimeEnd: () => void
  duration: number
}

export function Timer({ onTimeWarning, onTimeEnd, duration }: TimerProps) {
  const { timeRemaining, setTimeRemaining } = useSessionStore()

  useEffect(() => {
    setTimeRemaining(duration)

    const timer = setInterval(() => {
      setTimeRemaining(timeRemaining - 1)

      if (timeRemaining === 60) {
        onTimeWarning()
      }
      if (timeRemaining === 1) {
        onTimeEnd()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining, onTimeWarning, onTimeEnd, setTimeRemaining, duration])

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  )
}
