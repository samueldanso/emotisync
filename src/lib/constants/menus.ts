import { Phone, LineChart, BookText } from "lucide-react";

export const SIDEBAR_ITEMS = [
  { icon: Phone, label: "Chat", href: "/app/chat" },
  { icon: LineChart, label: "Insights", href: "/app/insights" },
  { icon: BookText, label: "Journals", href: "/app/journals" },
] as const;
