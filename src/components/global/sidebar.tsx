"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SIDEBAR_ITEMS } from "@/lib/constants/menus"
import { cn } from "@/lib/utils"
import { useWindow } from "@/hooks/use-window"
import { useVoice } from "@humeai/voice-react"

export function AppSidebar() {
  const pathname = usePathname()
  const { isMobile } = useWindow()
  const { status } = useVoice()
  const isInCall = status.value === "connected"

  // Hide sidebar during call
  if (isInCall) return null

  return (
    <aside
      className={cn(
        "z-30 bg-background/95 backdrop-blur-sm transition-all duration-200",
        isMobile
          ? "fixed right-0 bottom-0 left-0 h-16 border-t"
          : "fixed top-14 bottom-0 left-0 w-20 border-r",
      )}
    >
      <nav
        className={cn(
          "flex h-full",
          isMobile
            ? "items-center justify-around px-4"
            : "flex-col items-center gap-2 py-4",
        )}
      >
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 transition-colors duration-200",
                isMobile
                  ? "flex-col gap-1"
                  : "w-full rounded-lg px-4 py-2 hover:bg-accent",
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-primary" : "text-muted-foreground",
                  !isMobile && "opacity-70",
                )}
              />
              <span
                className={cn(
                  isMobile ? "text-xs" : "text-sm",
                  isActive
                    ? "font-medium text-primary"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
