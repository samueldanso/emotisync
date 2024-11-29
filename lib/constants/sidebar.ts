import { Phone, LineChart, BookText, Sparkles } from "lucide-react";

export const SIDEBAR_ITEMS = [
  { icon: Phone, label: "Voice Chat", href: "/chat" },
  { icon: LineChart, label: "Insights", href: "/insights" },
  { icon: BookText, label: "My Journals", href: "/journals" },
  { icon: Sparkles, label: "Recommendations", href: "/recommendations" },
] as const;
