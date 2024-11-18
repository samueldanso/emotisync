"use client"

import { Button } from "@/components/ui/button"
import { useVoice } from "@humeai/voice-react"
import { AnimatePresence, motion } from "framer-motion"
import { Phone } from "lucide-react"

export function StartCall() {
  const { status, connect } = useVoice()

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className="flex justify-center py-8"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <AnimatePresence>
            <motion.div
              variants={{
                initial: { scale: 0.5 },
                enter: { scale: 1 },
                exit: { scale: 0.5 },
              }}
            >
              <Button
                className="flex items-center gap-1.5"
                onClick={() => {
                  connect()
                    .then(() => {
                      console.log("Connection established")
                    })
                    .catch((error) => {
                      console.error("Connection failed:", error)
                    })
                    .finally(() => {
                      console.log("Connection attempt completed")
                    })
                }}
                size="lg"
              >
                <span>
                  <Phone
                    className="size-4 opacity-50"
                    strokeWidth={2}
                    stroke="currentColor"
                  />
                </span>
                <span>Start Call</span>
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
