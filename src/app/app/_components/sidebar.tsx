"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SIDEBAR_MENU } from "@/lib/constants/menus"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col space-y-4 bg-secondary/10 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 font-semibold text-lg tracking-tight">
          EmotiSync
        </h2>
        <div className="space-y-1">
          {SIDEBAR_MENU.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "group flex w-full cursor-pointer flex-col space-y-1 rounded-lg p-3 font-medium text-sm hover:bg-primary/10 hover:text-primary",
                pathname === route.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground",
              )}
            >
              <div className="flex items-center">
                <route.icon className={cn("mr-3 h-5 w-5")} />
                {route.title}
              </div>
              {route.description && (
                <p className="text-muted-foreground text-xs">
                  {route.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
