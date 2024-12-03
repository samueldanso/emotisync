"use client"

import { useVoice } from "@humeai/voice-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { cn } from "@/lib/utils"

export function StartCall() {
  const { status, connect } = useVoice()

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="flex flex-col items-center gap-4"
        >
          <Button
            size="icon"
            className={cn(
              "h-16 w-16 rounded-full bg-brand-primary hover:bg-brand-primary/90",
              "shadow-lg transition-all duration-200 hover:shadow-xl",
              "flex items-center justify-center",
            )}
            onClick={() => {
              connect()
                .then(() => console.log("Connected"))
                .catch((error) => console.error("Connection failed:", error))
            }}
          >
            <Phone className="h-6 w-6 text-white" strokeWidth={2} />
          </Button>
          <span className="font-medium text-muted-foreground">
            Click to talk
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
