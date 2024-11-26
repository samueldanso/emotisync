"use client"
import { useVoice } from "@humeai/voice-react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Phone } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Toggle } from "@/components/ui/toggle"
import MicFFT from "./mic-fft"
import { cn } from "@/lib/utils"

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice()

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 z-50 flex w-full items-center justify-center rounded-full p-4",
        "bg-gradient-to-t from-background via-background/90 to-transparent",
      )}
    >
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="flex items-center gap-4 rounded-full border bg-card/95 p-4 shadow-lg backdrop-blur-sm"
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => {
                if (isMuted) {
                  unmute()
                } else {
                  mute()
                }
              }}
            >
              {isMuted ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Toggle>

            <div className="relative h-8 w-48 shrink grow-0">
              <MicFFT fft={micFft} className="fill-current" />
            </div>

            <Button
              className="flex items-center gap-1"
              onClick={() => disconnect()}
              variant="destructive"
            >
              <Phone className="h-4 w-4 opacity-50" strokeWidth={2} />
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
