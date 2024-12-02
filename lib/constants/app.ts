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

// App sidebar navigation
export const SIDEBAR_ITEMS = [
  { icon: Phone, label: "Voice Chat", href: "/chat" },
  { icon: LineChart, label: "Insights", href: "/insights" },
  { icon: BookText, label: "My Journals", href: "/journals" },
  { icon: Sparkles, label: "Recommendations", href: "/recommendations" },
] as const

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
] as const
