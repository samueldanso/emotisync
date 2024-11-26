"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SIDEBAR_ITEMS } from "@/lib/constants/menus"
import { cn } from "@/lib/utils"
import { useWindow } from "@/hooks/use-window"

export function AppSidebar() {
  const pathname = usePathname()
  const { isMobile } = useWindow()

  return (
    <aside
      className={cn(
        "z-50 flex items-center bg-background/95 backdrop-blur-sm",
        isMobile
          ? "fixed right-0 bottom-0 left-0 h-16 border-t"
          : "fixed inset-y-0 left-0 hidden w-20 flex-col md:flex",
      )}
    >
      <nav
        className={cn(
          "flex items-center gap-2",
          isMobile ? "w-full justify-evenly px-4" : "w-full flex-col gap-4 p-4",
        )}
      >
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-center rounded-full transition-all duration-200",
                isMobile ? "h-12 w-12" : "h-10 w-10",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
              )}
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
