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
import { Settings, Logout, Bell } from "@/components/icons"
import type { User } from "@/db/schemas/users"
import type { Profile } from "@/db/schemas"
import { PROFILE_MENU } from "@/lib/constants/menus"

interface UserProfileButtonProps {
  user: User
  profile: Profile
}

const IconWrapper = ({
  Icon,
  className,
}: {
  Icon: React.ComponentType
  className?: string
}) => (
  <div className={className}>
    <Icon />
  </div>
)

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
      <DropdownMenuContent align="end" className="w-[240px]">
        <DropdownMenuGroup>
          <div className="px-2 py-2.5">
            <div className="font-medium text-sm">{displayName}</div>
            <div className="text-muted-foreground text-xs">
              {platform === "telegram" ? user.telegram_id : user.email}
            </div>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center justify-between px-2 py-2"
          disabled
        >
          <div className="flex items-center gap-2.5">
            <IconWrapper
              Icon={Bell}
              className="h-4 w-4 text-muted-foreground"
            />
            <span className="text-sm">Voice</span>
          </div>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs">
            Soon
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2.5">
            <IconWrapper
              Icon={Settings}
              className="h-4 w-4 text-muted-foreground"
            />
            <span className="text-sm">Theme</span>
          </div>
          <ThemeToggle className="h-4 w-4" />
        </DropdownMenuItem>

        {/* Profile Menu Items */}
        {PROFILE_MENU.map((item) => (
          <DropdownMenuItem
            key={item.title}
            className="flex items-center justify-between px-2 py-2"
            disabled={item.disabled}
          >
            <span className="text-sm">{item.title}</span>
            {item.badge && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs">
                {item.badge}
              </span>
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            supabaseClient.auth.signOut()
            router.push("/login")
          }}
          className="flex items-center gap-2.5 px-2 py-2 text-sm"
        >
          <IconWrapper
            Icon={Logout}
            className="h-4 w-4 text-muted-foreground"
          />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
