"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { UserProfileButton } from "@/components/user-profile";
import { VoiceProvider } from "@/components/providers/voice-provider";
import { Clock } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface ClientLayoutProps {
  children: React.ReactNode;
  user: any; // Replace with proper type later
  profile: any; // Replace with proper type later
  accessToken: string;
  usage: { remainingSeconds: number };
}

export function ClientLayout({
  children,
  user,
  profile,
  accessToken,
  usage,
}: ClientLayoutProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const remainingMinutes = Math.floor(usage.remainingSeconds / 60);

  return (
    <VoiceProvider accessToken={accessToken} profile={profile}>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            isCollapsed
              ? "ml-[3.5rem] md:ml-[4rem]"
              : "ml-[16rem] md:ml-[18rem]"
          )}
        >
          <div className="absolute top-4 right-4 flex items-center gap-2 sm:top-6 sm:right-6 sm:gap-3">
            <div className="flex items-center gap-1.5 rounded-full border bg-card px-2 py-1 text-xs sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
              <Clock className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" />
              <span>{remainingMinutes}m</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border bg-card/50 px-2 py-1 text-muted-foreground text-xs sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
              <span>2,524</span>
              <span className="text-[10px] sm:text-xs">pts</span>
            </div>
            <UserProfileButton user={user} profile={profile} />
          </div>
          <div className="flex min-h-screen items-center justify-center p-4">
            {children}
          </div>
        </main>
      </div>
    </VoiceProvider>
  );
}
