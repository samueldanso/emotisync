"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/ui/logo"
import { motion } from "framer-motion"
import { Chat, Document, IDuotoneBlack } from "@/components/icons"
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
    <Icon />
  </div>
)

const NAV_ITEMS = [
  { icon: Chat, label: "Chat", href: "/app" },
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
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 backdrop-blur-md lg:hidden">
        <div className="flex h-16 items-center justify-around px-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center rounded-lg px-3 py-2",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <IconWrapper Icon={item.icon} className="h-6 w-6" />
                <span className="mt-1 text-xs">{item.label}</span>
                {item.badge && (
                  <span className="-right-1 -top-1 absolute rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Desktop Side Navigation */}
      <motion.nav
        className="fixed top-0 left-0 hidden h-full w-[70px] border-r bg-background/95 backdrop-blur-md lg:block"
        initial={false}
        animate={{ width: "70px" }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex h-full flex-col p-3">
          <div className="mb-8 flex items-center justify-center p-2">
            <Logo className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex h-12 items-center justify-center rounded-lg transition-colors hover:bg-accent",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  <IconWrapper Icon={item.icon} className="h-5 w-5" />
                  <span className="invisible absolute left-full ml-2 whitespace-nowrap rounded-md bg-background/95 px-2 py-1 text-sm opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="-right-1 -top-1 absolute rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </motion.nav>
    </>
  )
}
