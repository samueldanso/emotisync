"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils/client"
import { SIDEBAR_MENU } from "@/lib/constants/menus"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/providers/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { supabaseClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut()
    router.push("/login")
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden h-full w-[260px] flex-col border-r bg-background/80 shadow-sm backdrop-blur-sm lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <Logo className="relative z-10 text-foreground" />
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-1 px-3 py-4">
        {SIDEBAR_MENU.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === item.href
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "text-muted-foreground",
              index === 3 && "mb-3 border-b pb-4",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>

      {/* User Profile & Actions */}
      <div className="border-t p-4">
        <div className="mb-4 flex items-center gap-3 rounded-lg bg-accent/50 p-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user?.user_metadata.avatar_url}
              alt={user?.email ?? ""}
            />
            <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate">
            <p className="truncate font-medium text-sm">
              {user?.user_metadata.full_name}
            </p>
            <p className="truncate text-muted-foreground text-xs">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <ThemeToggle className="w-full justify-start" />
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </aside>
  )
}
