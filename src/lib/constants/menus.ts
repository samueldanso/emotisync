import {
  MessageSquare,
  BookText,
  Lightbulb,
  LineChart,
  Activity,
  Music,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface NavbarMenuProps {
  title: string
  href: string
}

export const NAVBAR_MENU: NavbarMenuProps[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "How it works",
    href: "/#how-it-works",
  },
  {
    title: "FAQ",
    href: "/#faq",
  },
]

export interface SidebarMenuProps {
  title: string
  href: string
  icon: LucideIcon
  primary?: boolean
  description?: string
  badge?: string
  children?: SidebarMenuProps[]
}

export const SIDEBAR_MENU: SidebarMenuProps[] = [
  {
    title: "Chat",
    href: "/app",
    icon: MessageSquare,
  },
  {
    title: "Journals",
    href: "/app/journals",
    icon: BookText,
  },
  {
    title: "Recommendations",
    href: "/app/recommendations",
    icon: Lightbulb,
    children: [
      {
        title: "Actions",
        href: "/app/recommendations/actions",
        icon: Activity,
      },
      {
        title: "Sounds",
        href: "/app/recommendations/sounds",
        icon: Music,
      },
    ],
  },
  {
    title: "Insights",
    href: "/app/insights",
    icon: LineChart,
    badge: "Soon",
  },
]

export const FOOTER_MENU = {
  Product: [
    { title: "Features", href: "#features" },
    { title: "How it Works", href: "#how-it-works" },
  ],
  Legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
  Socials: [
    { title: "Twitter", href: "https://twitter.com/emotisync_xyz" },
    { title: "Telegram", href: "https://t.me/EmotiSync_bot" },
  ],
} as const

export interface ProfileMenuProps {
  title: string
  href?: string
  disabled?: boolean
  badge?: string
  onClick?: () => void
}

export const PROFILE_MENU: ProfileMenuProps[] = [
  {
    title: "Achievements",
    disabled: true,
    badge: "Soon",
  },
  {
    title: "Invite Friends",
    disabled: true,
    badge: "Soon",
  },
]
