"use client"

import { motion } from "framer-motion"
import { generateTypewriterKey } from "@/lib/utils/text"

export function WelcomeText() {
  return (
    <>
      <motion.h1 className="text-center font-bold font-heading text-4xl text-white">
        {Array.from("Welcome").map((char, index) => (
          <motion.span
            key={generateTypewriterKey(char, index, "welcome")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.1,
              delay: index * 0.05,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        className="mt-4 text-center text-lg text-white/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Your AI companion is waiting to chat with you
      </motion.p>
    </>
  )
}
