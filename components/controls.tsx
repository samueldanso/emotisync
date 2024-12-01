"use client";
import { useVoice } from "@humeai/voice-react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "@/components/ui/toggle";
import MicFFT from "@/components/mic-fft";
import { cn } from "@/lib/utils";

interface ControlsProps {
  userId: string;
  displayName: string;
}

export default function Controls({ userId, displayName }: ControlsProps) {
  const { status, disconnect, isMuted, unmute, mute, micFft } = useVoice();

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="flex items-center justify-center gap-4 rounded-full border bg-card p-4"
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => {
                if (isMuted) {
                  unmute();
                } else {
                  mute();
                }
              }}
            >
              {isMuted ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Toggle>

            <div className="relative h-8 w-48 shrink grow-0">
              <MicFFT fft={micFft} className="fill-current" />
            </div>

            <Button
              className="flex items-center gap-1"
              onClick={() => disconnect()}
              variant="destructive"
            >
              <Phone className="h-4 w-4 opacity-50" strokeWidth={2} />
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
