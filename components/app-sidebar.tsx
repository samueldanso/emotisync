"use client"

import { usePathname } from "next/navigation"
import { SIDEBAR_ITEMS } from "@/lib/constants/app"
import Link from "next/link"
import { Moon, Sun } from "lucide-react"
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
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

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

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <SidebarProvider defaultOpen={true}>
      <SidebarTrigger className="fixed top-4 left-4 z-50 md:hidden" />
      <Sidebar
        collapsible="icon"
        className="border-brand-background/20 border-r bg-brand-background"
      >
        <SidebarHeader className="px-2 py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/emotisync-icon.svg"
              alt="EmotiSync Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="ml-3 font-heading font-semibold text-brand-foreground text-xl">
              EmotiSync
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <div className="pt-2" />
          <SidebarMenu className="space-y-2 px-2">
            {SIDEBAR_ITEMS.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} className="w-full">
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={
                      item.soon ? `${item.label} (Coming Soon)` : item.label
                    }
                    className={`w-full justify-center transition-colors hover:text-brand-primary data-[active=true]:bg-brand-primary/10 data-[active=true]:text-brand-primary md:justify-start ${item.soon ? "opacity-50" : ""}`}
                  >
                    <item.icon className="h-5 w-5 shrink-0 transition-colors group-hover:text-brand-primary" />
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
        <SidebarFooter className="px-2 py-4">
          <SidebarMenuItem>
            <ThemeToggle />
          </SidebarMenuItem>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
