"use client"

import { usePathname } from "next/navigation"
import { Logo } from "@/components/ui/logo"
import { SIDEBAR_ITEMS } from "@/lib/constants/app"
import Link from "next/link"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

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
        <SidebarHeader className="py-3">
          <div className="flex items-center justify-center">
            <Logo className="h-8 w-8" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="space-y-1 px-2">
            {SIDEBAR_ITEMS.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} className="w-full">
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="w-full justify-center transition-colors hover:text-brand-primary data-[active=true]:bg-brand-primary/10 data-[active=true]:text-brand-primary md:justify-start"
                  >
                    <item.icon className="h-5 w-5 shrink-0 transition-colors group-hover:text-brand-primary" />
                    <span className="ml-3 font-medium">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <ThemeToggle />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
