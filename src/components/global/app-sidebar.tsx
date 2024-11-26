"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { SIDEBAR_ITEMS } from "@/lib/constants/menus";
import { cn } from "@/lib/utils";
import { useWindow } from "@/hooks/use-window";
import { useVoice } from "@humeai/voice-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile } = useWindow();
  const { status } = useVoice();
  const isInCall = status.value === "connected";

  // Hide sidebar during calls on mobile
  if (isInCall && isMobile) return null;

  // Desktop: Use shadcn Sidebar
  if (!isMobile) {
    return (
      <Sidebar>
        <SidebarHeader className="flex items-center justify-between px-4 py-2">
          <Logo className="h-8 w-8" />
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/app/chat")}
              title="New Chat"
            >
              <PlusIcon className="h-5 w-5" />
            </Button>
            <SidebarTrigger />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <nav className="flex flex-col gap-2 px-2">
            {SIDEBAR_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </SidebarContent>
      </Sidebar>
    );
  }

  // Mobile: Use bottom navigation
  return (
    <aside className="fixed bottom-0 left-0 right-0 z-30 h-16 border-t bg-background/95 backdrop-blur-sm">
      <nav className="flex h-full items-center justify-around px-4">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1"
            >
              <item.icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-xs",
                  isActive
                    ? "font-medium text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
