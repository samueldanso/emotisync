"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

interface AvatarStatusProps {
  avatar: string
  name: string
  isSpeaking?: boolean
}

export function AvatarStatus({ avatar, name, isSpeaking }: AvatarStatusProps) {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Avatar className="h-40 w-40">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      {isSpeaking && (
        <div className="mt-4 rounded-full bg-primary/10 px-4 py-1.5 text-sm">
          Speaking...
        </div>
      )}
    </motion.div>
  )
}
