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
    <div className="relative min-h-screen w-full bg-background">
      {!isInCall && (
        <header className="fixed top-0 z-40 flex h-14 w-full items-center justify-between px-4 md:px-6">
          <AppSidebar />
          <UserProfileButton user={user} profile={profile} />
        </header>
      )}
      <main
        className={cn(
          "container mx-auto px-4 md:px-6",
          "min-h-screen pt-20",
          "max-w-5xl",
          isInCall && "pt-0",
          "flex flex-col items-center",
        )}
      >
        {children}
      </main>
    </div>
  )
}
