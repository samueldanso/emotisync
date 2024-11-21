"use client"
import { useVoice } from "@humeai/voice-react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, X } from "lucide-react"
import { motion } from "framer-motion"
import MicFFT from "./mic-fft"
import { cn } from "@/lib/utils/cn"

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice()

  if (status.value !== "connected") return null

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
    >
      <div className="flex items-center gap-3 rounded-full border border-border/50 bg-card/95 px-3 py-2.5 shadow-lg backdrop-blur-sm">
        {/* Left: Mute Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-11 w-11 shrink-0 rounded-full",
            isMuted
              ? "bg-secondary hover:bg-secondary/80"
              : "bg-primary/10 text-primary hover:bg-primary/20",
          )}
          onClick={() => {
            if (isMuted) {
              unmute()
            } else {
              mute()
            }
          }}
        >
          {isMuted ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>

        {/* Wave visualization */}
        <div className="relative h-8 w-32">
          <MicFFT fft={micFft} className="fill-primary/20" />
        </div>

        {/* Right: End Call Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11 shrink-0 rounded-full bg-red-500 text-white hover:bg-red-600"
          onClick={() => disconnect()}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  )
}
