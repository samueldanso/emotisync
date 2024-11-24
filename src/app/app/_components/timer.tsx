"use client"

import { useEffect, useState } from "react"

interface TimerProps {
  duration: number // in seconds
  onTimeWarning: () => void
  onTimeEnd: () => void
}

export function Timer({ duration, onTimeWarning, onTimeEnd }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        // Check for 1-minute warning (at 60 seconds)
        if (prev === 60) {
          onTimeWarning()
        }
        // Check for end
        if (prev === 1) {
          onTimeEnd()
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onTimeWarning, onTimeEnd])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  )
}
