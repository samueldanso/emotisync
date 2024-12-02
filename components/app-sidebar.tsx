"use client";

import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "@/lib/constants/app";
import Link from "next/link";
import { Moon, Sun, PanelLeftClose } from "lucide-react";
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

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Button
      variant="ghost"
      size={isCollapsed ? "icon" : "default"}
      className={cn(
        "w-full justify-start gap-2 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
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

function SidebarToggle() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "absolute -right-2.5 top-5 h-5 w-5 rounded-full bg-background/80 shadow-sm hover:bg-accent/80 backdrop-blur-sm",
        isCollapsed && "rotate-180"
      )}
      onClick={toggleSidebar}
    >
      <PanelLeftClose className="h-3 w-3" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <aside
      className={cn(
        "relative bg-sidebar-background/80 backdrop-blur-sm transition-all duration-300",
        isCollapsed ? "w-[50px]" : "w-[200px]"
      )}
    >
      <div className="relative flex h-full flex-col">
        <div className="relative px-3 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-primary/90">
              <Image
                src="/emotisync-icon.svg"
                alt="EmotiSync"
                width={20}
                height={20}
                className="h-4 w-4"
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

        <nav className="flex-1 space-y-0.5 px-2">
          {SIDEBAR_ITEMS.map((item) => (
            <TooltipProvider key={item.href} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <div
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-all duration-200",
                        "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                        pathname === item.href &&
                          "bg-sidebar-accent/50 text-sidebar-primary font-medium",
                        isCollapsed && "justify-center px-0"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4 transition-colors",
                          pathname === item.href
                            ? "text-brand-primary"
                            : "text-sidebar-foreground/60"
                        )}
                      />
                      {!isCollapsed && (
                        <>
                          <span
                            className={cn(
                              "text-[13px]",
                              pathname === item.href
                                ? "text-sidebar-primary"
                                : "text-sidebar-foreground/60"
                            )}
                          >
                            {item.label}
                          </span>
                          {item.soon && (
                            <span className="ml-auto rounded-full bg-sidebar-accent/30 px-1.5 py-0.5 text-[10px]">
                              Soon
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="border-none">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>

        <div className="p-2">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
