"use client"
import { cn } from "@/lib/utils/client"
import { useVoice } from "@humeai/voice-react"
import { AnimatePresence, motion } from "framer-motion"
import { type ComponentRef, forwardRef } from "react"
import Expressions from "./expressions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MessagesProps {
  companionName: string
  companionAvatar?: string
}

const Messages = forwardRef<ComponentRef<typeof motion.div>, MessagesProps>(
  function Messages({ companionName, companionAvatar }, ref) {
    const { messages } = useVoice()

    return (
      <motion.div
        layoutScroll
        className="h-full overflow-y-auto px-4"
        ref={ref}
      >
        <motion.div className="flex flex-col space-y-6 pt-4 pb-20" layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {messages.map((msg) => {
              if (
                msg.type === "user_message" ||
                msg.type === "assistant_message"
              ) {
                const isUser = msg.type === "user_message"
                return (
                  <motion.div
                    key={`${msg.type}-${msg.message.content?.slice(0, 10)}`}
                    className={cn("flex gap-4", isUser && "flex-row-reverse")}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      {isUser ? (
                        <AvatarFallback>U</AvatarFallback>
                      ) : (
                        <>
                          <AvatarImage
                            src={companionAvatar}
                            alt={companionName}
                          />
                          <AvatarFallback>{companionName[0]}</AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div
                      className={cn(
                        "flex max-w-[80%] flex-col gap-2",
                        isUser && "items-end",
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2.5",
                          isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted",
                        )}
                      >
                        {msg.message.content}
                      </div>
                      <Expressions values={{ ...msg.models.prosody?.scores }} />
                    </div>
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
