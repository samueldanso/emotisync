import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/providers/sidebar-provider";
import { VoiceProvider } from "@/components/providers/voice-provider";
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
  if (!profile?.onboarding_completed) redirect("/onboarding/profile");

  const accessToken = await getHumeAccessToken();
  if (!accessToken) throw new Error("Failed to get Hume access token");

  return (
    <VoiceProvider accessToken={accessToken} profile={profile}>
      <SidebarProvider defaultOpen={false}>
        <div className="relative flex min-h-screen">
          <div className="hidden [&:not([data-in-call=true])]:block">
            <AppSidebar />
          </div>
          <main className="flex-1">{children}</main>
        </div>
      </SidebarProvider>
    </VoiceProvider>
  );
}
