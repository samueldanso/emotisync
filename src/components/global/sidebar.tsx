"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useWindow } from "@/hooks/use-window"
import { SIDEBAR_ITEMS } from "@/lib/constants/menus"

export function AppSidebar() {
  const pathname = usePathname()
  const { isMobile } = useWindow()

  return (
    <nav
      className={cn(
        "fixed z-40 bg-background/80 backdrop-blur-sm transition-all duration-300",
        // Mobile: Bottom navigation
        isMobile && "right-0 bottom-0 left-0 border-t",
        // Desktop: Side navigation
        !isMobile && "top-16 bottom-0 left-0 w-20 border-r",
      )}
    >
      <div
        className={cn(
          "flex items-center",
          // Mobile: Horizontal layout
          isMobile && "h-16 justify-around px-4",
          // Desktop: Vertical layout
          !isMobile && "h-full flex-col gap-4 py-4",
        )}
      >
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center p-2 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="mt-1 text-xs">{item.label}</span>
              {item.badge && (
                <span className="-right-1 -top-1 absolute rounded-full bg-primary/10 px-1.5 py-px text-[8px] text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
