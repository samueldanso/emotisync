"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getPlatform } from "@/lib/utils/platform-utils";
import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LogOut } from "lucide-react";
import type { User } from "@/lib/db/schemas/users";
import type { Profile } from "@/lib/db/schemas";
import { useEffect, useState } from "react";
import { checkUsageLimit } from "@/actions/rate-limit";

interface UserProfileButtonProps {
  user: User;
  profile: Profile;
}

export function UserProfileButton({ user, profile }: UserProfileButtonProps) {
  const [remainingMinutes, setRemainingMinutes] = useState<number>(10);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const router = useRouter();
  const platform = getPlatform();
  const displayName = profile?.display_name || user.first_name;

  // Fetch remaining minutes
  useEffect(() => {
    const checkRemaining = async () => {
      const usage = await checkUsageLimit();
      setRemainingMinutes(Math.floor(usage.remainingSeconds / 60));
    };
    checkRemaining();
  }, []);

  // Fetch user avatar
  useEffect(() => {
    const getProfileImage = async () => {
      const {
        data: { user: authUser },
      } = await supabaseClient.auth.getUser();

      if (platform === "telegram" && user.telegram_id) {
        // If using Telegram, use telegram profile photo
        // Note: You'll need to implement this based on your Telegram integration
        setAvatarUrl(null); // Implement Telegram avatar URL
      } else if (authUser?.user_metadata?.avatar_url) {
        // For Google auth, use the avatar from user_metadata
        setAvatarUrl(authUser.user_metadata.avatar_url);
      } else if (authUser?.user_metadata?.picture) {
        // Alternative metadata field for profile picture
        setAvatarUrl(authUser.user_metadata.picture);
      }
    };

    getProfileImage();
  }, [platform, user.telegram_id]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          {avatarUrl ? (
            <AvatarImage
              src={avatarUrl}
              alt={displayName}
              className="object-cover"
            />
          ) : (
            <AvatarFallback className="bg-primary/10 text-primary">
              {displayName[0].toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[260px] rounded-2xl border-none bg-background/95 p-2 shadow-lg backdrop-blur-sm"
      >
        <DropdownMenuGroup>
          <div className="px-2 py-3">
            <div className="font-medium">{displayName}</div>
            <div className="text-muted-foreground text-sm">
              {platform === "telegram" ? user.telegram_id : user.email}
            </div>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mx-2" />

        <div className="p-1.5">
          <DropdownMenuItem className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-primary/5">
            <span>Minutes</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs">
              {remainingMinutes}
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-primary/5"
            disabled
          >
            <span className="text-sm">Voice</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs">
              Soon
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-primary/5"
            disabled
          >
            <span className="text-sm">Personality</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs">
              Soon
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-primary/5"
            disabled
          >
            <span className="text-sm">Group chats</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs">
              Soon
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-primary/5">
            <span>Theme</span>
            <ThemeToggle />
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="mx-2" />

        <div className="p-1.5">
          <DropdownMenuItem
            onClick={() => {
              supabaseClient.auth.signOut();
              router.push("/login");
            }}
            className="flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-primary/5"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
