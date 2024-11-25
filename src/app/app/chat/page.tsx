import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { profiles, users, companions } from "@/lib/db/schemas";
import { StartCall } from "@/components/global/start-call";
import { AvatarCard } from "@/components/ui/avatar-card";

export default async function ChatPage() {
  const supabaseUser = await getUser();
  if (!supabaseUser) redirect("/login");

  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, supabaseUser.id),
  });
  if (!dbUser) redirect("/login");

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, dbUser.id),
  });
  if (!profile) redirect("/welcome/profile");

  const companion = await db.query.companions.findFirst({
    where: eq(companions.id, profile.companion_avatar),
  });
  if (!companion) throw new Error("Companion not found");

  const displayName = profile.display_name || dbUser.first_name;
  const companionName = profile.companion_name || companion.name;

  // Helper for greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-2xl flex-col items-center justify-center px-4">
      {/* Greeting Section */}
      <div className="mb-8 w-full text-center">
        <h1 className="mb-3 font-semibold text-3xl tracking-tight">
          {getGreeting()}, {displayName}
        </h1>
        <h2 className="mb-2 text-xl">
          I'm {companionName}, your personal AI companion
        </h2>
        <p className="text-muted-foreground">
          How are you feeling today? I'm here to listen and chat.
        </p>
      </div>

      {/* Avatar Card */}
      <div className="mb-8 w-full">
        <AvatarCard
          imageUrl={companion.image_url}
          name={companionName}
          description="Click to start talking"
        />
      </div>

      {/* Start Button */}
      <StartCall />
    </div>
  );
}
