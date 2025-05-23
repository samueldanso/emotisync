"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SIDEBAR_ITEMS } from "@/lib/constants/app"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AppSidebarProps {
  className?: string
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname()
  const { state, toggleSidebar } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <>
      <aside
        className={cn(
          "relative flex h-screen flex-col transition-all duration-300",
          "bg-gray-100 dark:bg-zinc-900",
          isCollapsed ? "w-[64px]" : "w-[280px]",
          className,
        )}
      >
        {/* Header */}
        <div className="relative flex h-[65px] items-center px-4">
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
              <span className="font-semibold font-urbanist text-xl">
                EmotiSync
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-3 p-3">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href

            if (!isCollapsed) {
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-4 rounded-lg px-3 py-3 font-medium text-sm transition-colors",
                      "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-accent text-accent-foreground",
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
              )
            }

            return (
              <TooltipProvider key={item.href} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={item.href}>
                      <div
                        className={cn(
                          "flex items-center justify-center rounded-lg py-3 transition-colors",
                          "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                          isActive && "bg-accent text-accent-foreground",
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
            )
          })}
        </nav>

        {/* Theme Toggle at Bottom */}
        <div className="p-4">
          {isCollapsed ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ThemeToggle className="!p-3 justify-center" />
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
      </aside>

      {/* Toggle Button - Always Visible and Clickable */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed h-8 w-8 rounded-full bg-background shadow-sm hover:bg-accent",
          isCollapsed ? "left-[80px]" : "left-[300px]",
          "top-[22px] z-50 transition-all duration-300",
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
    </>
  )
}
