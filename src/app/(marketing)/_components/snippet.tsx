"use client"

import { motion } from "framer-motion"

export default function AppSnippet() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mx-auto max-w-[1100px] px-4">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl rounded-b-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/gifs/ai.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </motion.div>
  )
}
