"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./messages";
import Controls from "./controls";
import { StartCall } from "./start-call";
import { type ComponentRef, useRef } from "react";
import { Shell } from "@/components/ui/shell";

//dymanic pesonalized promts based time mood insights
const STARTER_PROMPTS = [
  "How was your day?",
  "What's on your mind?",
  "Share a moment that made you smile",
  "Something bothering you?",
  "What are you looking forward to?",
];

// Create a separate component for the content to use hooks inside VoiceProvider
function SessionContent({
  profile,
}: {
  profile: { companion_name: string; companion_avatar: string };
}) {
  const _timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <>
      <Shell className="mb-4">
        <div className="flex flex-col space-y-4 p-6">
          <h2 className="font-semibold text-2xl">
            {/* Add the user first name from db eg Good evening {firstname} */}
            {greeting}, I'm {profile.companion_name}. Your AI Companion
          </h2>
          <p className="text-muted-foreground">
            I'm here to listen and help you reflect. You can talk about anything
            that's on your mind.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                type="button"
                key={prompt}
                className="rounded-full bg-secondary/50 px-4 py-2 text-sm transition-colors hover:bg-secondary/70"
                onClick={() => {
                  // Handle prompt click through SessionButton
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </Shell>

      <Messages ref={ref} />
      <Controls />
      <StartCall />
    </>
  );
}

/**
 * @component Chat
 * @description Main AI chat interface that handles voice processing and emotion analysis.
 * Manages real-time voice interactions and displays chat messages with emotion insights.
 *
 * @param {Object} props
 * @param {string} props.accessToken - Hume AI API access token for voice analysis
 * @param {Object} props.profile - User's companion preferences
 * @param {string} props.profile.companion_name - AI companion's name
 * @param {string} props.profile.companion_avatar - AI companion's avatar URL
 *
 * Features:
 * - Real-time voice processing
 * - Emotion analysis visualization
 * - Chat message history
 * - Voice recording controls
 */
export default function Session({
  accessToken,
  profile,
}: {
  accessToken: string;
  profile: {
    companion_name: string;
    companion_avatar: string;
  };
}) {
  const configId = process.env.NEXT_PUBLIC_HUME_CONFIG_ID;

  return (
    <div className="relative mx-auto flex w-full grow flex-col overflow-hidden">
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={configId}
        onMessage={() => {
          // Message handling
        }}
      >
        <SessionContent profile={profile} />
      </VoiceProvider>
    </div>
  );
}
