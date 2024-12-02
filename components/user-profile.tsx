"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, Settings } from "lucide-react"
import { getPlatform } from "@/lib/utils/platform"
import { supabaseClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/db/schemas/users"
import type { Profile } from "@/lib/db/schemas"
import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

interface UserProfileButtonProps {
  user: User
  profile: Profile
}

export function UserProfileButton({ user, profile }: UserProfileButtonProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const router = useRouter()
  const platform = getPlatform()
  const displayName = (
    profile?.display_name ||
    user.first_name ||
    user.name ||
    "User"
  ).split(" ")[0]

  useEffect(() => {
    const getProfileImage = async () => {
      const {
        data: { user: authUser },
      } = await supabaseClient.auth.getUser()

      if (platform === "telegram") {
        setAvatarUrl(null)
      } else if (authUser?.user_metadata?.avatar_url) {
        setAvatarUrl(authUser.user_metadata.avatar_url)
      } else if (authUser?.user_metadata?.picture) {
        setAvatarUrl(authUser.user_metadata.picture)
      }
    }

    getProfileImage()
  }, [platform])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button type="button">
          <Avatar className="h-10 w-10">
            {avatarUrl ? (
              <AvatarImage
                src={avatarUrl}
                alt={displayName}
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="bg-transparent text-primary">
                {displayName[0].toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <div className="space-y-6 pt-6">
          {/* Profile Info */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              {avatarUrl ? (
                <AvatarImage
                  src={avatarUrl}
                  alt={displayName}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="bg-transparent text-primary text-xl">
                  {displayName[0].toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="space-y-1">
              <h2 className="font-semibold text-lg">{displayName}</h2>
              <p className="text-muted-foreground text-sm">
                {platform === "telegram" ? "Telegram User" : user.email}
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Preferences */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium text-sm">
              <Settings className="h-4 w-4" />
              <span>Preferences</span>
            </div>
            <div className="flex flex-col space-y-3">
              <div className="flex cursor-not-allowed items-center justify-between opacity-50">
                <span className="text-muted-foreground text-sm">Voice</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                  Soon
                </span>
              </div>
              <div className="flex cursor-not-allowed items-center justify-between opacity-50">
                <span className="text-muted-foreground text-sm">
                  Personality
                </span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                  Soon
                </span>
              </div>
              <div className="flex cursor-not-allowed items-center justify-between opacity-50">
                <span className="text-muted-foreground text-sm">
                  Group chat
                </span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                  Soon
                </span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground text-sm">
                <span>Appearance</span>
                <span className="text-xs">Use theme toggle in sidebar</span>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Sign Out */}
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10"
            onClick={() => {
              supabaseClient.auth.signOut()
              router.push("/login")
            }}
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
