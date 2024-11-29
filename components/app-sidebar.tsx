"use client"

import { usePathname } from "next/navigation"
import { Logo } from "@/components/ui/logo"
import { SIDEBAR_ITEMS } from "@/lib/constants/"
import { cn } from "@/lib/utils"
import { useVoice } from "@humeai/voice-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function AppSidebar() {
  const pathname = usePathname()
  const { status } = useVoice()
  const isInCall = status.value === "connected"

  if (isInCall) return null

  return (
    <div className="flex items-center gap-2">
      <Logo className="h-6 w-6" />
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <Sidebar className="border-border/40 border-r bg-background">
        <SidebarHeader className="flex items-center justify-center py-8">
          <Logo className="h-8 w-8" />
        </SidebarHeader>
        <SidebarContent>
          <nav className="mt-4 flex flex-col gap-1 px-2">
            {SIDEBAR_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2.5 font-medium text-sm transition-colors",
                  pathname === item.href
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}
