"use client"

import { usePathname } from "next/navigation"
import { SIDEBAR_ITEMS } from "@/lib/constants/app"
import Link from "next/link"
import { Moon, Sun, PanelLeftClose, PanelLeft } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

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
  )
}

function SidebarToggle() {
  const { state, toggleSidebar } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "group absolute h-8 w-8 transition-all hover:bg-transparent",
        isCollapsed ? "-right-8 md:-right-10" : "right-2",
        "top-3.5 md:top-4",
      )}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          {isCollapsed ? (
            <PanelLeft className="h-5 w-5 transition-colors group-hover:text-brand-primary" />
          ) : (
            <PanelLeftClose className="h-5 w-5 transition-colors group-hover:text-brand-primary" />
          )}
        </TooltipTrigger>
        <TooltipContent side="right">Toggle Sidebar</TooltipContent>
      </Tooltip>
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={false}>
        <Sidebar
          collapsible="icon"
          className={cn(
            "relative border-brand-background/20 border-r bg-brand-background transition-all",
            isCollapsed ? "w-[3.5rem] md:w-[4rem]" : "w-[16rem] md:w-[18rem]",
          )}
        >
          <SidebarHeader className="px-2 py-3 md:py-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/emotisync-icon.svg"
                alt="EmotiSync Logo"
                width={32}
                height={32}
                className="h-6 w-6 md:h-7 md:w-7"
              />
              {!isCollapsed && (
                <span className="ml-3 font-heading font-semibold text-brand-foreground text-lg md:text-xl">
                  EmotiSync
                </span>
              )}
            </Link>
            <SidebarToggle />
          </SidebarHeader>
          <SidebarContent>
            <div className="pt-1 md:pt-2" />
            <SidebarMenu className="list-none space-y-1 px-2 md:space-y-2">
              {SIDEBAR_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href} className="list-none">
                  <Link href={item.href} className="w-full">
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={
                        item.soon ? `${item.label} (Coming Soon)` : item.label
                      }
                      className={cn(
                        "w-full justify-center transition-colors hover:text-brand-primary data-[active=true]:bg-brand-primary/10 data-[active=true]:text-brand-primary md:justify-start",
                        item.soon && "opacity-50",
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0 transition-colors group-hover:text-brand-primary md:h-6 md:w-6" />
                      <span className="ml-3 flex items-center gap-2 font-medium">
                        {item.label}
                        {item.soon && (
                          <Badge
                            variant="secondary"
                            className="h-5 font-normal text-xs"
                          >
                            Soon
                          </Badge>
                        )}
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="px-2 py-3 md:py-4">
            <SidebarMenuItem className="list-none">
              <ThemeToggle />
            </SidebarMenuItem>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </TooltipProvider>
  )
}
