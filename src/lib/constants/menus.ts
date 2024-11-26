import { Phone, LineChart, BookText } from "lucide-react"

// App sidebar navigation
export const SIDEBAR_ITEMS = [
  { icon: Phone, label: "Chat", href: "/app/chat" },
  { icon: LineChart, label: "Insights", href: "/app/insights" },
  { icon: BookText, label: "Journals", href: "/app/journals" },
] as const

// Marketing site navigation
export const NAVBAR_MENU = [
  { title: "Home", href: "/" },
  { title: "Features", href: "/#features" },
  { title: "How it works", href: "/#how-it-works" },
  { title: "FAQ", href: "/#faq" },
] as const

// Footer navigation
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
