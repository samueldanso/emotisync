"use client"

import { useVoice } from "@humeai/voice-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { checkUsageLimit } from "@/actions/rate-limit"
import { useState } from "react"
import { UsageWarning } from "./usage-warning"

export function StartCall() {
  const { status, connect } = useVoice()
  const [usageError, setUsageError] = useState<{
    message: string
    resetAt: Date
  } | null>(null)

  const handleStartCall = async () => {
    const usage = await checkUsageLimit()

    if (!usage.canStart) {
      setUsageError({
        message: usage.message,
        resetAt: usage.resetAt,
      })
      return
    }

    connect()
      .then(() => console.log("Voice connected"))
      .catch((error) => console.error("Voice connection failed:", error))
  }

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-background p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {usageError ? (
            <UsageWarning
              message={usageError.message}
              resetAt={usageError.resetAt}
            />
          ) : (
            <Button
              className="z-50 flex items-center gap-1.5"
              onClick={handleStartCall}
            >
              <Phone className="h-4 w-4 opacity-50" strokeWidth={2} />
              <span>Start Call</span>
            </Button>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
