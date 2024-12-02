"use client";

import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "@/lib/constants/app";
import Link from "next/link";
import { Moon, Sun, PanelLeftClose } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
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
      className={cn("w-full justify-start gap-2", isCollapsed && "h-9 w-9")}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <div className="relative h-5 w-5 shrink-0">
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute inset-0 h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      </div>
      {!isCollapsed && <span>Toggle theme</span>}
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
        "absolute -right-4 top-4 h-8 w-8 rounded-full transition-all hover:bg-muted",
        isCollapsed && "rotate-180"
      )}
      onClick={toggleSidebar}
    >
      <PanelLeftClose className="h-4 w-4" />
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
        "relative border-r bg-background transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="relative flex h-full flex-col">
        <div className="relative p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Image
                src="/logo.png"
                alt="EmotiSync"
                width={24}
                height={24}
                className="h-5 w-5"
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

        <nav className="flex-1 space-y-1 p-2">
          {SIDEBAR_ITEMS.map((item) => (
            <TooltipProvider key={item.href} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <div
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                        pathname === item.href
                          ? "bg-accent"
                          : "hover:bg-accent/50",
                        isCollapsed && "justify-center px-0"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && (
                        <>
                          <span>{item.label}</span>
                          {item.soon && (
                            <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs">
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

        <div className="p-4">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
