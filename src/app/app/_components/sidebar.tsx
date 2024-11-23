"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MessageSquare, Book, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "@/lib/supabase/client"

const routes = [
  {
    label: "Chat",
    icon: MessageSquare,
    href: "/app",
    color: "text-violet-500",
    description: "Start a conversation with your companion",
  },
  {
    label: "Journal Entries",
    icon: Book,
    href: "/app/journals",
    color: "text-emerald-500",
    description: "View your insights & recommendations",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col space-y-4 bg-secondary/10 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 font-semibold text-lg tracking-tight">
          EmotiSync
        </h2>
        <div className="space-y-1">
          {routes.map((route) => (
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
                <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
                {route.label}
              </div>
              <p className="text-muted-foreground text-xs">
                {route.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto px-3">
        <Button
          onClick={() => signOut()}
          variant="ghost"
          className="w-full justify-start"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
