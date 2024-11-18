import { getHumeAccessToken } from "@/lib/ai/humeai";
import dynamic from "next/dynamic";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { profiles } from "@/db/schemas";

interface ChatProps {
  accessToken: string;
  profile: {
    companion_name: string;
    companion_avatar: string;
  };
}

const Chat = dynamic<ChatProps>(() => import("./_components/chat"), {
  ssr: false,
});

export default async function AppPage() {
  const user = await getUser();

  if (!user?.email) {
    redirect("/login");
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  });

  if (!profile?.onboarding_completed) {
    redirect("/welcome");
  }

  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error("No access token available");
  }

  //Create a aimple welcome dialog for new user or new persion imedialtely after onboarding is complete this sterves as a basic steps or tuts to use app simple, also add profile page with points placeholer and invite in sidebar placeholder

  return (
    <div className="flex min-h-0 grow flex-col">
      <Chat
        accessToken={accessToken}
        profile={{
          companion_name: profile.companion_name,
          companion_avatar: profile.companion_avatar,
        }}
      />
    </div>
  );
}
