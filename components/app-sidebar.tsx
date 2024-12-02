"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "@/lib/constants/app";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AppSidebarProps {
  className?: string;
}

function SidebarToggle() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 rounded-full bg-background shadow-sm hover:bg-accent",
        isCollapsed ? "absolute -right-10 top-6" : "absolute right-3 top-6"
      )}
      onClick={toggleSidebar}
    >
      {isCollapsed ? (
        <PanelLeftOpen className="h-5 w-5" />
      ) : (
        <PanelLeftClose className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <aside
      className={cn(
        "relative bg-background transition-all duration-300",
        isCollapsed ? "w-[64px]" : "w-[280px]",
        className
      )}
    >
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/chat" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center">
              <Image
                src="/emotisync-icon.svg"
                alt="EmotiSync"
                width={30}
                height={30}
                className="h-6 w-6"
              />
            </div>
            {!isCollapsed && (
              <span className="font-urbanist text-xl font-semibold">
                EmotiSync
              </span>
            )}
          </Link>
          <SidebarToggle />
        </div>

        <nav className="flex-1 space-y-3 p-3">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            if (!isCollapsed) {
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-4 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                      "hover:bg-accent text-muted-foreground hover:text-accent-foreground",
                      isActive && "bg-accent text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {item.soon && (
                      <span className="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-[10px]">
                        Soon
                      </span>
                    )}
                  </div>
                </Link>
              );
            }

            return (
              <TooltipProvider key={item.href} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={item.href}>
                      <div
                        className={cn(
                          "flex items-center justify-center rounded-lg py-3 transition-colors",
                          "hover:bg-accent text-muted-foreground hover:text-accent-foreground",
                          isActive && "bg-accent text-accent-foreground"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10} hideWhenDetached>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </nav>

        <div className="p-4">
          {isCollapsed ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ThemeToggle className="justify-center !p-3" />
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10} hideWhenDetached>
                  Toggle theme
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <ThemeToggle />
          )}
        </div>
      </div>
    </aside>
  );
}
