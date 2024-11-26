"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { useVoice } from "@humeai/voice-react"

interface AvatarStatusProps {
  avatar: string
  name: string
  isSpeaking?: boolean
}

export function AvatarStatus({ avatar, name, isSpeaking }: AvatarStatusProps) {
  const { status } = useVoice()
  const isConnected = status.value === "connected"

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Avatar className="h-32 w-32 md:h-40 md:w-40">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>

      <AnimatePresence mode="wait">
        {isConnected &&
          (isSpeaking ? (
            <motion.div
              key="speaking"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 rounded-full bg-rose-500/10 px-4 py-1.5 text-rose-500 text-sm"
            >
              Speaking...
            </motion.div>
          ) : (
            <motion.div
              key="listening"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 rounded-full bg-primary/10 px-4 py-1.5 text-sm"
            >
              Listening...
            </motion.div>
          ))}
      </AnimatePresence>
    </motion.div>
  )
}
