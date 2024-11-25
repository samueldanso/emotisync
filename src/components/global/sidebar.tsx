"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SIDEBAR_ITEMS } from "@/lib/constants/menus"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-20 flex-col items-center border-border/50 border-r bg-background/95 backdrop-blur-sm md:flex">
      <div className="flex h-16 shrink-0 items-center">{/* Logo space */}</div>

      <nav className="flex w-full flex-1 flex-col items-center gap-4 p-4">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
              )}
              title={item.label}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  "group-hover:scale-110", // Added hover scale effect
                )}
              />
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
