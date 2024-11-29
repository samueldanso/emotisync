import dynamic from "next/dynamic";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { profiles, type Profile } from "@/lib/db/schemas";
import type { Companion } from "@/lib/db/schemas";
import type { User } from "@/lib/db/schemas";
import { getHumeAccessToken } from "@/lib/ai/humeai";
import { VoiceProvider } from "@/components/providers/voice-provider";

interface ChatProps {
  user: User;
  profile: Profile;
  avatar: Companion;
}

const Chat = dynamic<ChatProps>(() => import("@/components/chat"), {
  ssr: false,
});

export default async function ChatPage() {
  const user = await getUser();

  if (!user?.email) {
    redirect("/login");
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  });

  if (!profile?.onboarding_completed) {
    redirect("/onboarding/profile");
  }

  const accessToken = await getHumeAccessToken();
  if (!accessToken) throw new Error("Failed to get Hume access token");

  return (
    <div className="flex min-h-0 grow flex-col">
      <VoiceProvider accessToken={accessToken} profile={profile}>
        <Chat user={user} profile={profile} />
      </VoiceProvider>
    </div>
  );
}
