import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { VoiceProvider } from "@/components/providers/voice-provider";
import { UserProfileButton } from "@/components/user-profile";
import { getHumeAccessToken } from "@/lib/ai/humeai";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { profiles } from "@/lib/db/schemas";

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
    <VoiceProvider accessToken={accessToken} profile={profile}>
      <SidebarProvider defaultOpen>
        <div className="flex min-h-screen bg-background">
          <div className="w-80 flex-shrink-0 border-r bg-sidebar">
            <AppSidebar />
          </div>
          <div className="flex flex-1 flex-col">
            <header className="flex h-16 items-center justify-end border-b px-8">
              <UserProfileButton user={mappedUser} profile={profile} />
            </header>
            <main className="flex-1">
              <div className="mx-auto h-full max-w-5xl px-8 py-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </VoiceProvider>
  );
}
