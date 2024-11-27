import {
  Bot,
  Sparkles,
  AudioLines,
  Activity,
  type LucideIcon,
  BookText,
  LineChart,
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

export const FEATURES: Feature[] = [
  {
    icon: AudioLines,
    title: "Empathetic voice AI",
    description:
      "Converse naturally with your AI companion who listens and responds empathetically.",
  },
  {
    icon: Sparkles,
    title: "Mood-boosting recommendations",
    description:
      "Receive personalized, actionable recommendations to improve your mood - tailored just for you.",
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
      "EmotiSync analyzes your emotions in real-time to provide instant feedback and guidance.",
  },
  {
    icon: LineChart,
    title: "Tailored insights",
    description:
      "Get personalized insights about your emotional patterns & trends to better understand yourself.",
  },
  {
    icon: Bot,
    title: "Customizable AI companion",
    description:
      "Personalize your companion's personality to match your unique preferences.",
  },
] as const

export const HOW_IT_WORKS = [
  {
    title: "Speak freely",
    description:
      "Share your day, feelings, or thoughts naturally — Your AI companion listens with empathy.",
    imagePosition: "left",
    image: "/gifs/moti.gif",
  },
  {
    title: "Receive instant insights",
    description:
      "Get real-time insights as your voice conversation becomes a smart journal entry — no writing needed, ready to review anytime.",
    imagePosition: "right",
    image: "/images/step1.png",
  },
  {
    title: "Get personalized recommendations",
    description:
      "Receive tailored, actionable guidance based on your mood and journal insights to support your emotional growth over time.",
    imagePosition: "left",
    image: "/images/step1.png",
  },
] as const

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Christin",
    role: "Public Health Professional",
    content:
      "I was skeptical about EmotiSync AI, but it's incredibly natural and helpful. The insights are spot-on.",
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
      "EmotiSync turns your voice into mental clarity. Speak naturally to your AI companion — get instant insights and guidance to feel better every day.",
  },
  {
    question: "Can I use EmotiSync AI alongside traditional therapy?",
    answer:
      "Yes, you can! EmotiSync AI is designed to complement traditional therapy by helping you practice self reflection between sessions. However, it is not a replacement for professional one-on-one support.",
  },
  {
    question: "How is this different from regular journaling?",
    answer:
      "No writing required - just talk naturally. Get instant guidance and analysis instead of just tracking.",
  },
  {
    question: "How long do sessions take?",
    answer: "As long as you want. Speak freely, and let the AI do the rest.",
  },
  {
    question: "Is my data safe with EmotiSync?",
    answer:
      "Your privacy is our top priority and we adhere to strict privacy standards to safeguard your data. Your voice data is processed in real-time and is not stored.",
  },
  {
    question: "What kind of guidance and recommendations will I get?",
    answer:
      "From quick mood-boosting exercises, music, and books to personalized activities - all matched to your current emotional state and voice patterns.",
  },
  {
    question: "Who can benefit from using EmotiSync AI?",
    answer:
      "EmotiSync AI is beneficial for anyone seeking accessible emotional health insights—whether you're dealing with daily stress, need a a friendly listening ear, or want to explore self-care routines. If you're experiencing severe mental health issues, we strongly recommend consulting a licensed therapist.",
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
