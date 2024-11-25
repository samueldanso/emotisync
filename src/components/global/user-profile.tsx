"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getPlatform } from "@/lib/utils/platform-utils"
import { supabaseClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LogOut } from "lucide-react"
import type { User } from "@/lib/db/schemas/users"
import type { Profile } from "@/lib/db/schemas"

interface UserProfileButtonProps {
  user: User
  profile: Profile
}

export function UserProfileButton({ user, profile }: UserProfileButtonProps) {
  const router = useRouter()
  const platform = getPlatform()
  const displayName = profile?.display_name || user.first_name

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback>{displayName[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px] rounded-xl">
        <DropdownMenuGroup>
          <div className="px-2 py-2.5">
            <div className="font-medium text-sm">{displayName}</div>
            <div className="text-muted-foreground text-xs">
              {platform === "telegram" ? user.telegram_id : user.email}
            </div>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* Points */}
        <DropdownMenuItem
          className="flex items-center justify-between px-2 py-2"
          disabled
        >
          <span className="text-sm">Points</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs">
            Soon
          </span>
        </DropdownMenuItem>

        {/* Voice */}
        <DropdownMenuItem
          className="flex items-center justify-between px-2 py-2"
          disabled
        >
          <span className="text-sm">Voice</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs">
            Soon
          </span>
        </DropdownMenuItem>

        {/* Group chats */}
        <DropdownMenuItem
          className="flex items-center justify-between px-2 py-2"
          disabled
        >
          <span className="text-sm">Group chats</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs">
            Soon
          </span>
        </DropdownMenuItem>

        {/* Invite Friends */}
        <DropdownMenuItem
          className="flex items-center justify-between px-2 py-2"
          disabled
        >
          <span className="text-sm">Invite Friends</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs">
            Soon
          </span>
        </DropdownMenuItem>

        {/* Theme Toggle */}
        <DropdownMenuItem className="flex items-center justify-between px-2 py-2">
          <span className="text-sm">Theme</span>
          <ThemeToggle className="h-4 w-4" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sign out */}
        <DropdownMenuItem
          onClick={() => {
            supabaseClient.auth.signOut()
            router.push("/login")
          }}
          className="flex items-center gap-2.5 px-2 py-2 text-sm"
        >
          <LogOut className="h-4 w-4 text-muted-foreground" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
