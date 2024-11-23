"use client";

import { env } from "@/env";

import { VoiceProvider, useVoice } from "@humeai/voice-react";
import Messages from "./messages";
import Controls from "./controls";
import { StartCall } from "./start-call";
import { type ComponentRef, useRef, useState, useEffect } from "react";
import { AvatarStatus } from "./avatar-status";
import type { User } from "@/db/schemas/users";
import type { Avatar } from "@/db/schemas/avatars";
import {
  Avatar as UIAvatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

interface SessionProps {
  accessToken: string;
  user: User;
  avatar: Avatar;
}

function SessionContent({ user, avatar }: { user: User; avatar: Avatar }) {
  const { status, isMuted, messages } = useVoice();
  const _timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Reset speaking state when call ends
  useEffect(() => {
    if (status.value !== "connected") {
      setIsSpeaking(false);
    }
  }, [status.value]);

  // Monitor messages to detect AI speaking state
  useEffect(() => {
    if (status.value === "connected" && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === "assistant_message") {
        setIsSpeaking(true);
        // Add a small delay to simulate natural speech rhythm
        const timeout = setTimeout(() => {
          setIsSpeaking(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }
  }, [messages, status.value]);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const isActive = status.value === "connected";
  const isListening = isActive ? isActive && !isMuted : false;

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex h-full flex-col items-center">
        {!isActive ? (
          // Welcome State - Centered vertically and horizontally
          <div className="flex h-full flex-col items-center justify-center">
            <div className="relative mb-6">
              <UIAvatar className="h-40 w-40">
                <AvatarImage src={avatar.image_url} alt={avatar.name} />
                <AvatarFallback>{avatar.name[0]}</AvatarFallback>
              </UIAvatar>
            </div>

            <div className="mb-8 text-center">
              <h2 className="mb-2 font-semibold text-2xl">
                {greeting} {user.first_name}
              </h2>
              <p className="text-muted-foreground">
                I'm {avatar.name}, your AI companion
              </p>
            </div>

            <StartCall />
          </div>
        ) : (
          // Active Chat State
          <>
            {/* Top Section: Avatar + Status */}
            <div className="relative z-20 pt-16 pb-8">
              <AvatarStatus
                avatar={avatar.image_url}
                name={avatar.name}
                isSpeaking={isSpeaking}
                isListening={isListening}
              />
            </div>

            {/* Messages Section - Scrollable area */}
            <div className="relative z-10 h-full w-full max-w-3xl overflow-hidden px-4">
              <Messages
                ref={ref}
                companionName={avatar.name}
                companionAvatar={avatar.image_url}
              />
            </div>
          </>
        )}

        {/* Controls Section - Fixed at bottom and centered */}
        {isActive && (
          <div className="-translate-x-1/2 fixed bottom-8 left-1/2 z-50">
            <Controls />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Session({ accessToken, user, avatar }: SessionProps) {
  const configId = env.NEXT_PUBLIC_HUME_CONFIG_ID;

  return (
    <div className="relative flex h-[calc(100vh-4rem)] w-full grow flex-col overflow-hidden">
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={configId}
        onMessage={() => {
          // Message handling preserved
        }}
      >
        <SessionContent user={user} avatar={avatar} />
      </VoiceProvider>
    </div>
  );
}
