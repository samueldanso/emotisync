import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { profiles, users } from "@/lib/db/schemas";
import { UserProfileButton } from "@/components/global/user-profile";
import { AppSidebar } from "@/components/global/app-sidebar";
import { VoiceProvider } from "@/components/providers/voice-provider";
import { getHumeAccessToken } from "@/lib/ai/humeai";
import { SidebarProvider } from "@/components/ui/sidebar";

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
    <div className="relative min-h-screen bg-background">
      <VoiceProvider accessToken={accessToken}>
        <SidebarProvider>
          <header className="fixed top-0 right-0 left-0 z-40 h-14 border-b bg-background/95 backdrop-blur-sm">
            <div className="flex h-full items-center justify-between px-4">
              <AppSidebar />
              <UserProfileButton user={dbUser} profile={profile} />
            </div>
          </header>
          <main className="relative min-h-[calc(100vh-3.5rem)] flex-1 pt-14">
            {children}
          </main>
        </SidebarProvider>
      </VoiceProvider>
    </div>
  );
}
