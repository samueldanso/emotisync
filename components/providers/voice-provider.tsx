"use client";

import { VoiceProvider as HumeVoiceProvider } from "@humeai/voice-react";
import { env } from "@/env";
import type { Profile } from "@/lib/db/schemas/profiles";

interface VoiceProviderProps {
  accessToken: string;
  profile: Profile;
  children: React.ReactNode;
}

export function VoiceProvider({
  accessToken,
  profile,
  children,
}: VoiceProviderProps) {
  const onConnect = async (socket: WebSocket) => {
    const sessionSettings = {
      type: "session_settings",
      variables: {
        displayName: profile.display_name || "there",
        companionName: profile.companion_name,
      },
      context: {
        text: `Initial message: "Hi {{displayName}}! I'm {{companionName}}, and I'm here to listen and help you reflect on your day, thoughts, or feelings. What's on your mind today?"`,
        type: "persistent",
      },
    };

    socket.send(JSON.stringify(sessionSettings));
  };

  return (
    <HumeVoiceProvider
      auth={{ type: "accessToken", value: accessToken }}
      configId={env.NEXT_PUBLIC_HUME_CONFIG_ID}
      onConnect={onConnect}
    >
      {children}
    </HumeVoiceProvider>
  );
}
