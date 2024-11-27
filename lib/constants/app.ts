import {
  BookText,
  Pencil,
  Heart,
  Smile,
  BarChart3,
  Brain,
  Music,
  FileText,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Category {
  icon: LucideIcon
  label: string
}

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
