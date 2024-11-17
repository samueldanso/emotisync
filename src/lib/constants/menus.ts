import { Phone, FileText, ZapIcon, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavbarMenuProps {
  title: string;
  href: string;
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
];

export interface SidebarMenuProps {
  title: string;
  href: string;
  icon: LucideIcon;
  primary?: boolean;
  description?: string;
}

export const SIDEBAR_MENU: SidebarMenuProps[] = [
  {
    title: "Chat",
    href: "/app",
    icon: Phone,
    primary: true,
  },
  {
    title: "Journals",
    href: "/app/journals",
    icon: FileText,
    description: "Your conversation history",
  },
  {
    title: "Recommendations",
    href: "/app/recommendations",
    icon: ZapIcon,
    description: "Personalized guidance",
  },
  {
    title: "Insights",
    href: "/app/insights",
    icon: Sparkles,
    description: "Progress & patterns",
  },
];

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
} as const;
