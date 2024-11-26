"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { useVoice } from "@humeai/voice-react"
import { cn } from "@/lib/utils"

interface AvatarStatusProps {
  avatar: string
  name: string
  isSpeaking: boolean
  isListening?: boolean
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
        <Avatar className="h-28 w-28 md:h-32 md:w-32">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>

        {/* Pulsing rings when speaking */}
        <AnimatePresence>
          {isSpeaking && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-rose-500/20"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-rose-500/10"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 1.4, opacity: 1 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {isConnected && (
          <motion.div
            key={isSpeaking ? "speaking" : "listening"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "mt-4 rounded-full px-4 py-1.5 text-sm",
              isSpeaking
                ? "bg-rose-500/10 text-rose-500"
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
