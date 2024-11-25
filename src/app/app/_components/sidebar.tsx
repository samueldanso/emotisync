"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Chat, Document, IDuotoneBlack } from "@/components/icons"
import type { CustomIconProps } from "@/components/icons/types"

// Icon wrapper to handle className prop
const IconWrapper = ({
  Icon,
  className,
}: {
  Icon: React.ComponentType<CustomIconProps>
  className?: string
}) => (
  <div className={className}>
    <Icon className={className} />
  </div>
)

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/app" },
  { icon: Chat, label: "Chat", href: "/app/chat" },
  { icon: Document, label: "Journals", href: "/app/journals" },
  {
    icon: IDuotoneBlack,
    label: "Insights",
    href: "/app/insights",
    badge: "Soon",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-40 border-t bg-background">
      <div className="flex h-16 items-center justify-around px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center p-2",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <IconWrapper Icon={item.icon} className="h-6 w-6" />
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
