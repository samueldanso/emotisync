"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LogOut, Settings, Clock } from "lucide-react";
import { getPlatform } from "@/lib/utils/platform";
import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/db/schemas/users";
import type { Profile } from "@/lib/db/schemas";
import { useEffect, useState } from "react";
import { checkUsageLimit } from "../actions/rate-limit";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

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
    <Sheet>
      <SheetTrigger asChild>
        <button type="button" className="group">
          <Avatar className="h-8 w-8 transition-opacity hover:opacity-80">
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
      <SheetContent className="w-full border-l sm:max-w-md">
        <SheetHeader className="space-y-6 pb-6">
          <SheetTitle className="font-medium text-lg">
            Profile Settings
          </SheetTitle>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-primary/20">
              {avatarUrl ? (
                <AvatarImage
                  src={avatarUrl}
                  alt={displayName}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {displayName[0].toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="space-y-1">
              <h2 className="font-semibold text-lg">{displayName}</h2>
              <p className="text-muted-foreground text-sm">
                {platform === "telegram" ? user.telegram_id : user.email}
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Usage */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium text-sm">
              <Clock className="h-4 w-4" />
              <span>Usage</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-muted-foreground text-sm">
                Remaining Time
              </span>
              <span className="font-medium text-sm">
                {remainingMinutes} minutes
              </span>
            </div>
          </div>

          <Separator />

          {/* Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium text-sm">
              <Settings className="h-4 w-4" />
              <span>Preferences</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-muted-foreground text-sm">Theme</span>
              <ThemeToggle />
            </div>
          </div>

          <Separator />

          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => {
              supabaseClient.auth.signOut();
              router.push("/login");
            }}
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
