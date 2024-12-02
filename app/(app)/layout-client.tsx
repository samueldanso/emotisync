"use client";

import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { UserProfileButton } from "@/components/user-profile";
import { VoiceProvider } from "@/components/providers/voice-provider";
import type { Profile } from "@/lib/db/schemas";
import { SidebarProvider } from "@/components/ui/sidebar";

interface AppLayoutClientProps {
  children: React.ReactNode;
  user: {
    id: string;
    name: string;
    email: string;
    first_name: string;
    last_name: string | null;
    created_at: Date | null;
    updated_at: Date | null;
  };
  profile: Profile;
  accessToken: string;
  remainingMinutes: number;
}

export function AppLayoutClient({
  children,
  user,
  profile,
  accessToken,
  remainingMinutes,
}: AppLayoutClientProps) {
  return (
    <SidebarProvider>
      <VoiceProvider accessToken={accessToken} profile={profile}>
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="relative flex-1">
            <div className="absolute right-4 top-4">
              <UserProfileButton user={user} profile={profile} />
            </div>
            {children}
          </main>
        </div>
      </VoiceProvider>
    </SidebarProvider>
  );
}
