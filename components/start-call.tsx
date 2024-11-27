"use client";

import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export function StartCall() {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Button
            size="lg"
            className="relative z-50 flex items-center gap-2 rounded-full px-8 py-6"
            onClick={() => {
              connect()
                .then(() => console.log("Connected"))
                .catch((error) => console.error("Connection failed:", error));
            }}
          >
            <Phone className="h-5 w-5" strokeWidth={2} />
            <span className="text-lg">Start Talking</span>
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
