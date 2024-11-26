import { getHumeAccessToken } from "@/lib/ai/humeai";
import { redirect } from "next/navigation";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { companions, profiles, users } from "@/lib/db/schemas";
import dynamic from "next/dynamic";
import { getUser } from "@/lib/supabase/server";

const Chat = dynamic(() => import("@/components/global/chat"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = await getHumeAccessToken();
  if (!accessToken) {
    throw new Error();
  }

  // Get Supabase user
  const supabaseUser = await getUser();
  if (!supabaseUser) redirect("/login");

  // Get DB user
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

  return (
    <div className="flex grow flex-col">
      <Chat
        accessToken={accessToken}
        user={dbUser}
        profile={profile}
        avatar={{
          image_url: companion.image_url,
          name: profile.companion_name || companion.name,
        }}
      />
    </div>
  );
}
