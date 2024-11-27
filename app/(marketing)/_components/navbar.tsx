"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { NAVBAR_MENU } from "@/lib/constants"
import { Logo } from "../../../components/ui/logo"
import { Button, buttonVariants } from "../../../components/ui/button"
import { MobileNav } from "./mobile-nav"
import { useWindow } from "../../../hooks/use-window"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { isMobile } = useWindow()

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed inset-x-0 top-4 z-50 mx-auto px-4 transition-all duration-300",
        hasScrolled ? "max-w-[880px]" : "max-w-[1080px]",
      )}
    >
      <nav className="flex h-12 items-center justify-between rounded-full bg-white/80 px-4 shadow-[0_4px_12px_0_rgba(0,0,0,0.08)] backdrop-blur-md md:h-[56px] dark:bg-zinc-800/80">
        <Logo className="h-7 w-7 md:h-8 md:w-8" />

        <div className="hidden flex-1 items-center justify-center md:flex">
          <ul className="flex items-center space-x-8">
            {NAVBAR_MENU.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className="text-brand-muted transition-colors hover:text-brand-primary"
                >
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className={cn(
              buttonVariants({
                variant: "soft",
                size: "default",
                className: "h-8 text-sm md:h-10 md:text-base",
              }),
            )}
          >
            Sign in
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "default",
                  className: "h-8 text-sm md:h-10 md:text-base",
                }),
              )}
            >
              Get started
            </Link>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isOpen && isMobile && <MobileNav onOpenChange={setIsOpen} />}
    </motion.header>
  )
}
