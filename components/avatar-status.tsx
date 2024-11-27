"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useVoice } from "@humeai/voice-react"
import { cn } from "@/lib/utils"

interface AvatarStatusProps {
  avatar: string
  name: string
  isSpeaking: boolean
  isListening: boolean
}

export function AvatarStatus({
  avatar,
  name,
  isSpeaking,
  isListening,
}: AvatarStatusProps) {
  const { status } = useVoice()
  const isConnected = status.value === "connected"

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {/* Pulsating circles - only show when speaking */}
        {isSpeaking && (
          <>
            <div
              className="-m-8 absolute inset-0 animate-pulse rounded-full bg-brand-primary/10"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
            />
            <div
              className="-m-16 absolute inset-0 animate-pulse rounded-full bg-brand-primary/5"
              style={{ animation: "pulse 2s ease-in-out infinite 0.5s" }}
            />
          </>
        )}

        {/* Avatar image */}
        <div className="relative z-10 h-24 w-24 overflow-hidden rounded-full border-2 border-brand-primary/20">
          <img src={avatar} alt={name} className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Status indicator */}
      <AnimatePresence mode="wait">
        {isConnected && (
          <motion.div
            key={isSpeaking ? "speaking" : isListening ? "listening" : "ready"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "mt-4 rounded-full px-4 py-1.5 font-medium text-sm",
              isSpeaking
                ? "bg-rose-500/10 text-rose-500"
                : isListening
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-primary/10 text-primary",
            )}
          >
            {isSpeaking
              ? "Speaking..."
              : isListening
                ? "Listening..."
                : "Ready"}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
