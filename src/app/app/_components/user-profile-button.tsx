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
import { getPlatform } from "@/lib/utils/client"
import { supabaseClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import type { User } from "@/db/schemas"

interface UserProfileButtonProps {
  user: User
}

export function UserProfileButton({ user }: UserProfileButtonProps) {
  const router = useRouter()
  const platform = getPlatform()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback>{user.first_name[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuGroup>
          <div className="px-2 py-1.5">
            <div className="font-medium text-sm">{user.first_name}</div>
            <div className="text-muted-foreground text-xs">
              {platform === "telegram" ? user.telegram_id : user.email}
            </div>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="flex items-center justify-between px-2 py-1.5">
            <span className="text-sm">Theme</span>
            <ThemeToggle className="h-4 w-4" />
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            supabaseClient.auth.signOut()
            router.push("/login")
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
