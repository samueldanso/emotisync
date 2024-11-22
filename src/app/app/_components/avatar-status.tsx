"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

interface AvatarStatusProps {
  avatar: string
  name: string
  isListening?: boolean
  isSpeaking?: boolean
}

export function AvatarStatus({
  avatar,
  name,
  isListening,
  isSpeaking,
}: AvatarStatusProps) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative mb-4">
        <Avatar className="h-40 w-40">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>

        {/* Enhanced pulsating animation for speaking */}
        {isSpeaking && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary/20"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.2, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary/10"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
          </>
        )}
      </div>

      {/* Status indicator below avatar */}
      {(isListening || isSpeaking) && (
        <div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm">
          {isSpeaking ? "Speaking..." : "Listening..."}
        </div>
      )}
    </div>
  )
}
