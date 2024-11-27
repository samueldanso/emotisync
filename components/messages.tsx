"use client"

import { cn } from "@/lib/utils"
import { useVoice } from "@humeai/voice-react"
import { AnimatePresence, motion } from "framer-motion"
import { forwardRef, useEffect } from "react"
import Expressions from "./expressions"
import type { User } from "@/lib/db/schemas/users"
import type { Profile } from "@/lib/db/schemas/profiles"

interface MessagesProps {
  user: User
  profile: Profile
}

const Messages = forwardRef<HTMLDivElement, MessagesProps>(
  ({ user, profile }, ref) => {
    const { messages } = useVoice()
    const displayName = profile?.display_name || user.first_name
    const companionName = profile.companion_name

    // Auto scroll to bottom
    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight
      }
    }, [messages])

    return (
      <div ref={ref} className="scrollbar-none h-full overflow-y-auto">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {messages.map((msg) => {
              if (
                msg.type === "user_message" ||
                msg.type === "assistant_message"
              ) {
                const key = `${msg.type}-${msg.message?.content?.slice(0, 10)}`
                return (
                  <motion.div
                    key={key}
                    className={cn(
                      "w-[80%] rounded-lg p-4",
                      msg.type === "user_message"
                        ? "ml-auto bg-primary/10"
                        : "bg-muted/50",
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    layout
                  >
                    <div className="mb-2 font-medium text-muted-foreground text-xs">
                      {msg.type === "user_message"
                        ? displayName
                        : companionName}
                    </div>
                    <div className="text-sm">{msg.message?.content || ""}</div>
                    {msg.models?.prosody?.scores && (
                      <Expressions values={msg.models.prosody.scores} />
                    )}
                  </motion.div>
                )
              }
              return null
            })}
          </AnimatePresence>
        </div>
      </div>
    )
  },
)

Messages.displayName = "Messages"

export default Messages
