"use client"
import { useVoice } from "@humeai/voice-react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Toggle } from "@/components/ui/toggle"
import MicFFT from "@/components/mic-fft"

export default function Controls() {
  const { status, disconnect, isMuted, unmute, mute, micFft } = useVoice()

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="flex items-center justify-center gap-3 rounded-full border bg-card p-3"
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
              className="h-8 w-8 rounded-full"
            >
              {isMuted ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Toggle>

            <div className="relative h-6 w-40 shrink grow-0">
              <MicFFT fft={micFft} className="fill-current" />
            </div>

            <Button
              className="h-8 w-8 rounded-full p-0"
              onClick={() => disconnect()}
              variant="destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
