"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={cn("h-8 w-8 p-2", className)} />
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn("p-2 transition-colors duration-200", className)}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className="h-4 w-4 text-brand-paragraph hover:text-brand-heading" />
      ) : (
        <Moon className="h-4 w-4 text-brand-paragraph hover:text-brand-heading" />
      )}
    </button>
  )
}
