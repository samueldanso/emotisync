"use client"

import { cn } from "@/lib/utils"
import { useVoice } from "@humeai/voice-react"
import { AnimatePresence, motion } from "framer-motion"
import { type ComponentRef, forwardRef } from "react"
import Expressions from "./expressions"

const Messages = forwardRef<ComponentRef<typeof motion.div>>(
  function Messages(_, ref) {
    const { messages } = useVoice()

    return (
      <motion.div
        layoutScroll
        className="grow overflow-auto rounded-md p-4"
        ref={ref}
      >
        <motion.div className="mx-auto flex w-full max-w-2xl flex-col gap-4 pb-24">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => {
              if (
                msg.type === "user_message" ||
                msg.type === "assistant_message"
              ) {
                const key = `${msg.type}-${msg.message?.content?.slice(
                  0,
                  10,
                )}-${Date.now()}`
                return (
                  <motion.div
                    key={key}
                    className={cn(
                      "w-[80%]",
                      "bg-card",
                      "rounded border border-border",
                      msg.type === "user_message" ? "ml-auto" : "",
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                  >
                    <div className="px-3 pt-4 font-medium text-xs capitalize leading-none opacity-50">
                      {msg.type === "user_message" ? "You" : "Assistant"}
                    </div>
                    <div className="px-3 pb-3">
                      {msg.message?.content || ""}
                    </div>
                    {msg.models?.prosody?.scores && (
                      <Expressions values={msg.models.prosody.scores} />
                    )}
                  </motion.div>
                )
              }
              return null
            })}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    )
  },
)

export default Messages
