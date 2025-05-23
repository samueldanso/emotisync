"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SIDEBAR_ITEMS } from "@/lib/constants/app"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface AppMobileSidebarProps {
  className?: string
}

export function AppMobileSidebar({ className }: AppMobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const sidebarContent = (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center justify-between px-4 py-4">
        <Link href="/chat" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center">
            <Image
              src="/emotisync-icon.svg"
              alt="EmotiSync"
              width={30}
              height={30}
              className="h-6 w-6"
            />
          </div>
          <span className="font-semibold font-urbanist text-xl">EmotiSync</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <PanelLeftClose className="h-5 w-5" />
          <span className="sr-only">Close Sidebar</span>
        </Button>
      </div>

      <nav className="flex-1 space-y-3 p-3">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-4 rounded-lg px-3 py-3 font-medium text-sm transition-colors",
                  "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-accent text-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.soon && (
                  <span className="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-[10px]">
                    Soon
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4">
        <ThemeToggle />
      </div>
    </div>
  )

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 h-8 w-8 rounded-full bg-background shadow-sm hover:bg-accent"
          onClick={() => setIsOpen(true)}
        >
          {isOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className={cn(
          "w-[280px] p-0",
          "bg-gray-100 dark:bg-zinc-900",
          className,
        )}
      >
        {sidebarContent}
      </SheetContent>
    </Sheet>
  )
}
