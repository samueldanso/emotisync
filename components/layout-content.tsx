"use client"

import { useVoice } from "@humeai/voice-react"
import { UserProfileButton } from "@/components/user-profile"
import { AppSidebar } from "@/components/app-sidebar"
import type { User } from "@/lib/db/schemas/users"
import type { Profile } from "@/lib/db/schemas/profiles"
import { cn } from "@/lib/utils"

interface LayoutContentProps {
  children: React.ReactNode
  user: User
  profile: Profile
}

export function LayoutContent({ children, user, profile }: LayoutContentProps) {
  const { status } = useVoice()
  const isInCall = status.value === "connected"

  return (
    <div className="relative min-h-screen bg-background">
      {!isInCall && (
        <div className="fixed top-0 z-40 flex h-14 w-full items-center justify-between px-4">
          <AppSidebar />
          <UserProfileButton user={user} profile={profile} />
        </div>
      )}
      <main
        className={cn(
          "relative flex-1 px-4 md:px-8",
          "mx-auto w-full max-w-[1200px]",
          "flex flex-col items-center justify-start",
          isInCall ? "pt-0" : "min-h-[calc(100vh-3.5rem)] pt-14",
        )}
      >
        {children}
      </main>
    </div>
  )
}
