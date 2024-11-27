"use client"

import { useVoice } from "@humeai/voice-react"
import { UserProfileButton } from "@/components/user-profile"
import type { User } from "@/lib/db/schemas/users"
import type { Profile } from "@/lib/db/schemas/profiles"

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
        <header className="fixed top-0 z-20 flex h-14 w-full items-center justify-end px-4 md:px-6">
          <UserProfileButton user={user} profile={profile} />
        </header>
      )}
      <main className="container relative mx-auto flex min-h-screen flex-col items-center justify-center px-4 md:px-6">
        {children}
      </main>
    </div>
  )
}
