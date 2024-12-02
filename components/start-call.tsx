"use client"

import { useVoice } from "@humeai/voice-react"
import { AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export function StartCall() {
  const { status, connect } = useVoice()

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <Button
          size="lg"
          className="flex items-center gap-2 rounded-full px-8 py-6"
          onClick={() => {
            connect()
              .then(() => console.log("Connected"))
              .catch((error) => console.error("Connection failed:", error))
          }}
        >
          <Phone className="h-5 w-5" strokeWidth={2} />
          <span className="text-lg">Start talking</span>
        </Button>
      ) : null}
    </AnimatePresence>
  )
}
