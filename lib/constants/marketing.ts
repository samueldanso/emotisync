import {
  Sparkles,
  AudioLines,
  Activity,
  type LucideIcon,
  BookText,
  LineChart,
  UserCircle,
} from "lucide-react"

export interface Testimonial {
  name: string
  role: string
  content: string
  avatar: string
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

// Marketing site navigation
export const NAVBAR_MENU = [
  { title: "Home", href: "/" },
  { title: "Features", href: "/#features" },
  { title: "How it works", href: "/#how-it-works" },
  { title: "FAQs", href: "/#faq" },
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
    { title: "Telegram", href: "https://t.me/emotisync_bot/emotisync" },
  ],
} as const

export const FEATURES: Feature[] = [
  {
    icon: AudioLines,
    title: "Empathetic voice AI",
    description:
      "Converse naturally with your friendly AI companion, who listens with empathy.",
  },
  {
    icon: Sparkles,
    title: "Mood-boosting recommendations",
    description:
      "Receive personalized, actionable suggestions to improve your emotional well-being.",
  },
  {
    icon: BookText,
    title: "Smart journal summaries",
    description:
      "Automatically generate journal entries from your voice conversations - no writing required.",
  },
  {
    icon: Activity,
    title: "Real-time emotional analysis",
    description:
      "EmotiSync analyzes your emotions in real-time to provide instant feedback and support.",
  },
  {
    icon: LineChart,
    title: "Tailored insights",
    description:
      "Get personalized insights about your emotional patterns & trends to better understand yourself.",
  },
  {
    icon: UserCircle,
    title: "Customizable AI companion",
    description:
      "Personalize your companion's voice, avatar and personality to match your unique preferences.",
  },
] as const

export const HOW_IT_WORKS = [
  {
    title: "Speak freely",
    description:
      "Share anything on your mind naturally — Your personal AI companion listens with empathy.",
    imagePosition: "left",
    image: "/gifs/moti.gif",
  },
  {
    title: "Track your insights",
    description:
      "Get instant feedback as your voice conversation is automatically turned into a journal entry — no writing needed, ready to review anytime.",
    imagePosition: "right",
    image: "/images/step1.png",
  },
  {
    title: "Get actionable recommendations",
    description:
      "Receive tailored, actionable recommendations based on your mood patterns and insights to feel better.",
    imagePosition: "left",
    image: "/images/step1.png",
  },
] as const

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Christin",
    role: "Public Health Professional",
    content:
      "I was skeptical about EmotiSync AI, but it's incredibly natural and helpful. The actionable recommendations are spot-on.",
    avatar: "/images/avatar2.png",
  },
  {
    name: "Anonymous",
    role: "@anonymous",
    content:
      "I always wanted to mood journal but never had the time. Speaking feels so much more natural.",
    avatar: "/images/avatar2.png",
  },
  {
    name: "Emmanuel",
    role: "Student",
    content:
      "As someone whos an introvert, this feels like talking to a friend who really gets me. Other apps felt like homework.",
    avatar: "/images/avatar3.png",
  },
] as const

export const FAQS = [
  {
    question: "How does EmotiSync improve my emotional well-being?",
    answer:
      "EmotiSync turns your thoughts into reflections and mood-boosting recommendations. Just talk to your AI friend to feel better every day.",
  },
  {
    question: "Can I use EmotiSync AI as therapy?",
    answer:
      "EmotiSync AI is designed to provide a listening ear and mood-boosting recommendations. However, it is not a replacement for professional one-on-one support.",
  },
  {
    question:
      "How is this different from regular journaling and mood tracking?",
    answer:
      "EmotiSync analyzes your emotions in real-time to provide instant feedback and support.",
  },
  {
    question: "How long do calls take?",
    answer:
      "As short or long as you want. Speak freely, and let the AI do the rest.",
  },
  {
    question: "Is my data safe with EmotiSync?",
    answer:
      "Your privacy is our top priority and we adhere to strict privacy standards to safeguard your data. Your voice data is processed in real-time and is not stored.",
  },
  {
    question: "What kind of recommendations will I get?",
    answer:
      "From quick mood-boosting exercises, music, and books to personalized activities - all matched to your current emotional state and patterns.",
  },
] as const

export const colorPairs = [
  {
    bg: "#F3E8FF",
    icon: "#9333EA",
  },
  {
    bg: "#FFE4E8",
    icon: "#E11D48",
  },
  {
    bg: "#FFE4DD",
    icon: "#F97316",
  },
  {
    bg: "#E0F2FE",
    icon: "#0EA5E9",
  },
  {
    bg: "#E0EAFF",
    icon: "#4F46E5",
  },
  {
    bg: "#DCFCE7",
    icon: "#16A34A",
  },
] as const
