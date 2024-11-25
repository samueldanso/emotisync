"use client";
import { useVoice, VoiceProvider } from "@humeai/voice-react";
import Messages from "./messages";
import Controls from "./controls";
import { StartCall } from "./start-call";
import { type ComponentRef, useRef, useState, useEffect } from "react";
import { AvatarStatus } from "./avatar-status";
import type { User } from "@/lib/db/schemas/users";
import type { Profile } from "@/lib/db/schemas/profiles";
import type { Companion } from "@/lib/db/schemas/companions";
import { sessionManager } from "@/lib/ai/sessions";
import { Timer } from "./timer";
import { Spinner } from "@/components/icons/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveJournalAction } from "@/actions/journal";
import { getCurrentEmotions } from "@/lib/services/emotions";
import { checkChatAvailability } from "@/actions/rate-limit";
import { UsageWarning } from "./usage-warning";
import { useChatStore } from "@/lib/stores/chat-store";
import { env } from "@/env";

interface SessionProps {
  accessToken: string;
  user: User;
  profile: Profile;
  avatar: Companion;
}

function SessionContent({
  user,
  profile,
  avatar,
}: Omit<SessionProps, "accessToken">): JSX.Element {
  const { status, disconnect, messages, sendMessage, sendSessionSettings } =
    useVoice();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesRef = useRef<ComponentRef<typeof Messages>>(null);
  const [isGeneratingJournal, setIsGeneratingJournal] = useState(false);
  const router = useRouter();
  const [canStart, setCanStart] = useState(true);
  const [limitMessage, setLimitMessage] = useState("");
  const [resetAt, setResetAt] = useState(new Date());
  const {
    messages: chatMessages,
    emotional_state,
    setEmotionalState,
  } = useChatStore();

  useEffect(() => {
    async function checkLimit() {
      const limit = await checkChatAvailability();
      setCanStart(limit.canStart);
      setLimitMessage(limit.message);
      setResetAt(limit.resetAt);
    }
    checkLimit();
  }, []);

  // Monitor messages to detect AI speaking state
  useEffect(() => {
    if (status.value === "connected" && messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === "assistant_message") {
        setIsSpeaking(true);
        const timeout = setTimeout(() => setIsSpeaking(false), 2000);
        return () => clearTimeout(timeout);
      }
    }
  }, [messages, status.value]);

  useEffect(() => {
    if (status.value === "connected") {
      const settings = sessionManager.initializeSession(user, profile, avatar);

      sendSessionSettings(settings);

      const timing = sessionManager.handleTiming(
        // Warning callback
        () => {
          sendMessage(
            "We have about 1 minute left. Remember, I'll generate a journal entry and recommendations based on our conversation."
          );
        },
        // End session callback
        () => {
          sendMessage(
            "Thank you for sharing. I'll generate your journal entry now. Looking forward to our next conversation!"
          ).then(() => {
            setTimeout(disconnect, 2000);
          });
        }
      );

      timing.startSession();

      return () => {
        timing.cleanup();
      };
    }
  }, [
    status.value,
    sendMessage,
    disconnect,
    sendSessionSettings,
    user,
    profile,
    avatar,
  ]);

  const isActive = status.value === "connected";
  const isListening = isActive && !isSpeaking;

  const handleTimeWarning = () => {
    if (!isSpeaking) {
      sendMessage(
        "We have about 1 minute left. Feel free to continue sharing."
      );
    }
  };

  const handleTimeEnd = () => {
    sendMessage(
      "Thank you for sharing. I'll generate your journal entry now."
    ).then(() => {
      setTimeout(() => {
        _handleSessionEnd();
      }, 2000);
    });
  };

  const _handleSessionEnd = async () => {
    setIsGeneratingJournal(true);
    try {
      const result = await saveJournalAction({
        userId: user.id,
        messages: chatMessages,
        emotional_state,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success("Your journal entry has been saved!");
      router.push("/app/journals");
    } catch (_error) {
      toast.error("Failed to save journal entry");
    } finally {
      setIsGeneratingJournal(false);
      disconnect();
    }
  };

  // Get user's display name
  const _displayName = profile?.display_name || user.first_name;

  // Get time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Add this effect to sync emotions with chat store
  useEffect(() => {
    if (messages?.length > 0) {
      const currentEmotion = getCurrentEmotions(messages);
      setEmotionalState(currentEmotion);
    }
  }, [messages, setEmotionalState]);

  if (!canStart) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4">
        <UsageWarning message={limitMessage} resetAt={resetAt} />
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex h-full flex-col items-center">
        {!isActive ? (
          <div className="flex h-full flex-col items-center justify-center px-4 pt-16 md:pt-0">
            <div className="mb-6 text-center">
              <h1 className="mb-3 font-semibold text-3xl tracking-tight md:text-4xl lg:text-5xl">
                {getGreeting()}, {profile.display_name}
              </h1>
              <h2 className="mb-2 font-medium text-xl md:text-2xl lg:text-3xl">
                I'm {profile.companion_name}, your personal AI companion
              </h2>
              <p className="text-base text-muted-foreground md:text-lg">
                How are you feeling today? I'm here to listen and chat.
              </p>
            </div>

            <AvatarStatus
              avatar={avatar.image_url}
              name={avatar.name}
              isListening={false}
              isSpeaking={false}
            />

            <div className="mt-8">
              <StartCall />
            </div>
          </div>
        ) : (
          <>
            <div className="relative z-20 pt-16 pb-8">
              <AvatarStatus
                avatar={avatar.image_url}
                name={avatar.name}
                isSpeaking={isSpeaking}
                isListening={isListening}
              />
            </div>

            <div className="relative z-10 h-full w-full max-w-3xl overflow-hidden px-4">
              <Messages ref={messagesRef} />
            </div>
          </>
        )}

        {/* Timer and Controls */}
        {isActive && (
          <>
            <div className="fixed top-4 right-4 z-50">
              <Timer
                duration={120}
                onTimeWarning={handleTimeWarning}
                onTimeEnd={handleTimeEnd}
              />
            </div>
            <div className="-translate-x-1/2 fixed bottom-8 left-1/2 z-50">
              <Controls />
            </div>
          </>
        )}

        {/* Journal generation overlay */}
        {isGeneratingJournal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center">
              <Spinner className="mb-4 h-8 w-8" />
              <p className="text-lg">
                Generating your personalized journal entry...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Session({ accessToken, ...props }: SessionProps) {
  return (
    <div className="relative flex h-[calc(100vh-4rem)] w-full grow flex-col overflow-hidden">
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={env.NEXT_PUBLIC_HUME_CONFIG_ID}
      >
        <SessionContent {...props} />
      </VoiceProvider>
    </div>
  );
}

export { Session };
