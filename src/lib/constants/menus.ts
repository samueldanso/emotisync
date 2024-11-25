import type { LucideIcon } from "lucide-react";
import { Home } from "@/components/icons";
import { Chat } from "@/components/icons/chat";
import { Dashboard } from "@/components/icons/dashboard";
import { FileDuoToneBlack } from "@/components/icons/file-duotone-black";

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

interface MenuItem {
  title: string;
  href?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  badge?: string;
}

export const PROFILE_MENU: MenuItem[] = [
  {
    title: "Achievements",
    badge: "Soon",
    disabled: true,
  },
  {
    title: "Invite Friends",
    badge: "Soon",
    disabled: true,
  },
];

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: string;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: Chat, label: "Chat", href: "/app/chat" },
  { icon: Dashboard, label: "Insights", href: "/app/insights" },
  { icon: FileDuoToneBlack, label: "Journals", href: "/app/journals" },
];
