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
        "z-30 flex w-20 flex-col items-center bg-background/95 backdrop-blur-sm",
        isMobile
          ? "fixed right-0 bottom-0 left-0 h-16 w-full flex-row justify-around border-t"
          : "fixed inset-y-0 left-0 hidden md:flex",
      )}
    >
      <nav className="flex w-full flex-1 flex-col items-center gap-4 p-4">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
              )}
              title={item.label}
            >
              <item.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
