"use client"
import { Logo } from "@/components/ui/logo"
import { UserProfileButton } from "./user-profile"
import type { User } from "@/lib/db/schemas/users"
import type { Profile } from "@/lib/db/schemas"

interface AppHeaderProps {
  user: User
  profile: Profile
}

export function AppHeader({ user, profile }: AppHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 md:px-8">
        <Logo className="h-8 w-8" />
        <UserProfileButton user={user} profile={profile} />
      </div>
    </header>
  )
}
