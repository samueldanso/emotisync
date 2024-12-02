import {
  BookText,
  Pencil,
  Heart,
  Smile,
  BarChart3,
  Brain,
  Music,
  FileText,
  Phone,
  LineChart,
  Sparkles,
  Activity,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Category {
  icon: LucideIcon
  label: string
}

interface SidebarItem {
  icon: LucideIcon
  label: string
  href: string
  soon?: boolean
}

// App sidebar navigation
export const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: Phone, label: "Chat", href: "/chat" },
  { icon: BookText, label: "Journal", href: "/journal" },
  { icon: Sparkles, label: "Recommendations", href: "/recommendations" },
  { icon: LineChart, label: "Insights", href: "/insights", soon: true },
]

export const JOURNAL_CATEGORIES = [
  { icon: Heart, label: "Emotional Growth" },
  { icon: Smile, label: "Mood Tracking" },
  { icon: Pencil, label: "Reflections" },
  { icon: BookText, label: "Daily Entries" },
] as const satisfies Category[]

export const INSIGHT_CATEGORIES = [
  { icon: BarChart3, label: "Mood Trends" },
  { icon: Brain, label: "Cognitive Patterns" },
  { icon: Music, label: "Relaxation" },
  { icon: FileText, label: "Daily Reports" },
] as const satisfies Category[]

export const RECOMMENDATION_CATEGORIES = [
  { icon: Sparkles, label: "Mood Boosting" },
  { icon: Brain, label: "Mindfulness" },
  { icon: Activity, label: "Activities" },
] as const satisfies Category[]
