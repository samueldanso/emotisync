"use client"
import { useVoice } from "@humeai/voice-react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Toggle } from "@/components/ui/toggle"
import MicFFT from "@/components/mic-fft"
import { toast } from "sonner"
import { generateJournalEntry } from "@/lib/ai/journal"
import { createJournal } from "@/actions/journal"
import { generateRecommendations } from "@/lib/ai/recommendation"
import { createRecommendation } from "@/actions/recommendation"
import { useState } from "react"
import type {
  RecommendationCategory,
  RecommendationType,
} from "@/lib/types/recommendation"

interface ControlsProps {
  userId: string
  displayName: string
}

export default function Controls({ userId, displayName }: ControlsProps) {
  const { status, disconnect, isMuted, unmute, mute, micFft, messages } =
    useVoice()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleEndCall = async () => {
    disconnect()
    setIsGenerating(true)

    try {
      // Generate and save journal entry
      const entry = generateJournalEntry(messages)
      const journalResult = await createJournal(
        userId,
        entry.title,
        entry.summary,
        entry.emotional_insights,
      )

      if (journalResult.error) throw new Error(journalResult.error)
      if (!journalResult.data?.id)
        throw new Error("Failed to create journal entry")

      toast.success("Journal Saved", {
        description: "Your journal entry has been saved successfully.",
      })

      // Generate and save recommendations
      const recommendations = generateRecommendations(
        messages,
        userId,
        journalResult.data.id,
      )

      for (const rec of recommendations) {
        const { error } = await createRecommendation(
          userId,
          journalResult.data.id,
          rec.title,
          rec.description,
          rec.category as RecommendationCategory,
          rec.type as RecommendationType,
          rec.emotional_context,
        )

        if (error) throw new Error(error)
      }

      toast.success("Recommendations Generated", {
        description: "Your personalized recommendations are ready.",
      })
    } catch (_error) {
      toast.error("Error", {
        description: "Failed to save data. Please try again.",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      {isGenerating ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-background/95 p-4 text-center backdrop-blur-sm">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-semibold text-2xl"
          >
            Thanks for talking to me today, {displayName}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Generating Journal Entry...
          </motion.p>
        </div>
      ) : (
        <div className="relative w-full">
          <AnimatePresence>
            {status.value === "connected" ? (
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                className="flex items-center justify-center gap-3 rounded-full border bg-card p-3"
              >
                <Toggle
                  pressed={!isMuted}
                  onPressedChange={() => {
                    if (isMuted) {
                      unmute()
                    } else {
                      mute()
                    }
                  }}
                  className="h-8 w-8 rounded-full"
                >
                  {isMuted ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Toggle>

                <div className="relative h-6 w-40 shrink grow-0">
                  <MicFFT fft={micFft} className="fill-current" />
                </div>

                <Button
                  className="h-8 w-8 rounded-full p-0"
                  onClick={handleEndCall}
                  variant="destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </>
  )
}
