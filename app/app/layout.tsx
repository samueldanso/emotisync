import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { profiles, users } from "@/lib/db/schemas";
import { VoiceProvider } from "@/components/providers/voice-provider";
import { getHumeAccessToken } from "@/lib/ai/humeai";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutContent } from "@/components/layout-content";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const accessToken = await getHumeAccessToken();
  if (!accessToken) {
    throw new Error("No access token available");
  }

  return (
    <VoiceProvider accessToken={accessToken}>
      <SidebarProvider defaultOpen={false}>
        <LayoutContent user={dbUser} profile={profile}>
          {children}
        </LayoutContent>
      </SidebarProvider>
    </VoiceProvider>
  );
}
