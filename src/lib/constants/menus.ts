import type { LucideIcon } from "lucide-react"

interface MenuItem {
  title: string
  href?: string
  icon?: LucideIcon
  disabled?: boolean
  badge?: string
  onClick?: () => void
}

// Profile dropdown menu items
export const PROFILE_MENU: MenuItem[] = [
  {
    title: "Achievements",
    badge: "Soon",
    disabled: true,
    onClick: () => {
      // Will implement achievements feature
    },
  },
  {
    title: "Invite Friends",
    badge: "Soon",
    disabled: true,
    onClick: () => {
      // Will implement invite feature
    },
  },
]

// Main navigation items (moved to sidebar.tsx)
// We can remove this since we're now handling nav items directly in the sidebar component
