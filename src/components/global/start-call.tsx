"use client"

import { Button } from "@/components/ui/button"
import { useVoice } from "@humeai/voice-react"
import { motion } from "framer-motion"

export function StartCall() {
  const { connect } = useVoice()

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        onClick={connect}
        size="lg"
        className="flex items-center gap-2 px-6"
      >
        <span>Start Conversation</span>
      </Button>
    </motion.div>
  )
}
