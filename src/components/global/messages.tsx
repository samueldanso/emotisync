"use client"
import { cn } from "@/lib/utils"
import { useVoice } from "@humeai/voice-react"
import { AnimatePresence, motion } from "framer-motion"
import { type ComponentRef, forwardRef, useEffect } from "react"
import Expressions from "./expressions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useChatStore } from "@/lib/stores/chat-store"

interface MessagesProps {
  companionName: string
  companionAvatar?: string
}

const Messages = forwardRef<ComponentRef<typeof motion.div>, MessagesProps>(
  function Messages({ companionName, companionAvatar }, ref) {
    const { messages } = useVoice()
    const { setMessages } = useChatStore()

    // Update chat store when messages change
    useEffect(() => {
      setMessages(messages)
    }, [messages, setMessages])

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
                const content = msg.message?.content || ""
                const scores = msg.models?.prosody?.scores || {}

                return (
                  <motion.div
                    key={`${msg.type}-${content.slice(0, 10)}`}
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
                        {content}
                      </div>
                      <Expressions values={scores} />
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
