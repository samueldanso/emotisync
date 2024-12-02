import { AppLayoutClient } from "./layout-client";
import { getHumeAccessToken } from "@/lib/ai/humeai";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { profiles } from "@/lib/db/schemas";
import { checkUsageLimit } from "@/actions/rate-limit";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const user = await getUser();
  if (!user) redirect("/login");

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  });
  if (!profile?.onboarding_completed) redirect("/profile");

  const accessToken = await getHumeAccessToken();
  if (!accessToken) throw new Error("Failed to get Hume access token");

  const usage = await checkUsageLimit();
  const remainingMinutes = Math.floor(usage.remainingSeconds / 60);

  const mappedUser = {
    id: user.id,
    name: user.user_metadata?.name || user.email?.split("@")[0] || "",
    email: user.email || "",
    first_name: user.user_metadata?.first_name || "",
    last_name: user.user_metadata?.last_name || null,
    created_at: user.created_at ? new Date(user.created_at) : null,
    updated_at: user.updated_at ? new Date(user.updated_at) : null,
  };

  return (
    <AppLayoutClient
      user={mappedUser}
      profile={profile}
      accessToken={accessToken}
      remainingMinutes={remainingMinutes}
    >
      {children}
    </AppLayoutClient>
  );
}
