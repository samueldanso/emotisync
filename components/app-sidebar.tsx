"use client";

import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "@/lib/constants/app";
import Link from "next/link";
import { Moon, Sun, PanelLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
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
        isCollapsed ? "absolute -right-10 top-6" : "absolute right-3 top-6",
        isCollapsed && "rotate-180"
      )}
      onClick={toggleSidebar}
    >
      <PanelLeft className="h-5 w-5" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Button
      variant="ghost"
      size={isCollapsed ? "icon" : "default"}
      className={cn(
        "w-full justify-start gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isCollapsed && "h-8 w-8"
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <div className="relative h-4 w-4 shrink-0">
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute inset-0 h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      </div>
      {!isCollapsed && <span className="text-sm">Toggle theme</span>}
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
        "relative bg-sidebar-background transition-all duration-300",
        isCollapsed ? "w-[64px]" : "w-[200px]",
        className
      )}
    >
      <div className="relative flex h-full flex-col">
        <div className="relative px-3 py-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center">
              <Image
                src="/emotisync-icon.svg"
                alt="EmotiSync"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </div>
            {!isCollapsed && (
              <span className="font-urbanist text-base font-semibold text-sidebar-foreground">
                EmotiSync
              </span>
            )}
          </Link>
          <SidebarToggle />
        </div>

        <nav className="mt-4 flex-1 space-y-2 px-2">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            if (!isCollapsed) {
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive &&
                        "bg-sidebar-accent text-sidebar-primary font-medium"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive
                          ? "text-sidebar-primary"
                          : "text-sidebar-foreground/60"
                      )}
                    />
                    <span
                      className={cn(
                        "text-[14px]",
                        isActive
                          ? "text-sidebar-primary"
                          : "text-sidebar-foreground/60"
                      )}
                    >
                      {item.label}
                    </span>
                    {item.soon && (
                      <span className="ml-auto rounded-full bg-sidebar-accent px-1.5 py-0.5 text-[10px]">
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
                          "flex items-center justify-center rounded-lg py-2 transition-all duration-200",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive &&
                            "bg-sidebar-accent text-sidebar-primary font-medium"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5 transition-colors",
                            isActive
                              ? "text-sidebar-primary"
                              : "text-sidebar-foreground/60"
                          )}
                        />
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="border-none"
                    sideOffset={10}
                    hideWhenDetached
                  >
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </nav>

        <div className="p-2">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
