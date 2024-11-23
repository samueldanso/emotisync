"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { NAVBAR_MENU } from "@/lib/constants"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface MobileNavProps {
  onOpenChange: (open: boolean) => void
}

export function MobileNav({ onOpenChange }: MobileNavProps) {
  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      className="fixed inset-x-0 top-[65px] z-50 p-4"
    >
      <nav className="rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-black/[0.05] backdrop-blur-md dark:bg-zinc-800/80">
        <ul className="space-y-1.5">
          {NAVBAR_MENU.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className="block rounded-2xl px-3 py-2 text-brand-muted text-xl hover:text-brand-primary"
                onClick={() => onOpenChange(false)}
              >
                {route.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-end px-3">
          <ThemeToggle />
        </div>
      </nav>
    </motion.div>
  )
}
