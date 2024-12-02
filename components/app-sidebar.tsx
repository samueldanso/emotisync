"use client";

import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "@/lib/constants/app";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarMenuButton
      tooltip="Toggle theme"
      className="w-full justify-center transition-colors hover:text-brand-primary md:justify-start"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <div className="relative h-5 w-5 shrink-0">
        <Sun className="dark:-rotate-90 h-5 w-5 rotate-0 scale-100 transition-transform dark:scale-0" />
        <Moon className="absolute inset-0 h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      </div>
      <span className="ml-3 font-medium">Toggle theme</span>
    </SidebarMenuButton>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar>
      <SidebarHeader>
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
            <span className="font-semibold font-urbanist text-xl">
              EmotiSync
            </span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {SIDEBAR_ITEMS.map((item) => (
            <TooltipProvider key={item.href} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <SidebarMenuItem
                      className={cn(
                        "gap-3",
                        pathname === item.href && "bg-accent"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                      {item.soon && (
                        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs">
                          Soon
                        </span>
                      )}
                    </SidebarMenuItem>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="border-none">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
