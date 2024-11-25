import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { profiles, companions, users } from "@/lib/db/schemas";
import Link from "next/link";
import Image from "next/image";
import { getGreeting } from "@/lib/utils";

export default async function HomePage() {
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

  const displayName = profile.display_name || dbUser.name;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col px-4 pt-8 md:px-6">
      {/* Welcome Section */}
      <div className="mb-12 text-left">
        <h1 className="mb-2 font-heading font-semibold text-3xl tracking-tight">
          {`${getGreeting()}, ${displayName}`}
        </h1>
        <p className="text-muted-foreground">How are you feeling today?</p>
      </div>

      {/* AI Companion Card */}
      <div className="mx-auto w-full max-w-md rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-8">
        <div className="flex flex-col items-center">
          <Image
            src={companion.image_url}
            alt={companion.name}
            width={120}
            height={120}
            className="mb-6 rounded-full shadow-lg"
            priority
          />
          <h2 className="mb-2 font-medium text-xl">{companion.name}</h2>
          <p className="mb-8 text-center text-muted-foreground">
            Your AI companion for emotional well-being
          </p>
          <Link
            href="/app/chat"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground text-sm shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
          >
            Start Conversation
          </Link>
        </div>
      </div>
    </div>
  );
}
