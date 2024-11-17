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
        "fixed bottom-0 left-0 flex w-full items-center justify-center p-4",
        "bg-gradient-to-t from-card via-card/90 to-card/0",
      )}
    >
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100%",
              opacity: 0,
            }}
            className={
              "flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-sm"
            }
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
                <MicOff className={"size-4"} />
              ) : (
                <Mic className={"size-4"} />
              )}
            </Toggle>

            <div className={"relative grid h-8 w-48 shrink grow-0"}>
              <MicFFT fft={micFft} className={"fill-current"} />
            </div>

            <Button
              className={"flex items-center gap-1"}
              onClick={() => {
                disconnect()
              }}
              variant={"destructive"}
            >
              <span>
                <Phone
                  className={"size-4 opacity-50"}
                  strokeWidth={2}
                  stroke={"currentColor"}
                />
              </span>
              <span>End Call</span>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
