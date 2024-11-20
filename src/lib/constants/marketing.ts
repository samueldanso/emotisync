import {
  Book,
  Bot,
  MessageSquare,
  Sparkles,
  AudioLines,
  Activity,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface FeaturesProps {
  icon: LucideIcon
  title: string
  description: string
}

export const FEATURES: FeaturesProps[] = [
  {
    icon: AudioLines,
    title: "Empathetic voice AI",
    description:
      "Express yourself through natural voice conversations with AI who listens and responds with empathy.",
  },
  {
    icon: Activity,
    title: "Mood-boosting recommendations",
    description:
      "Receive personalized actionable recommendations that actually work for you.",
  },
  {
    icon: Book,
    title: "Smart journal summaries",
    description:
      "Automatically generate journal summaries that track your reflection progress - zero writing required.",
  },
  {
    icon: Sparkles,
    title: "Tailored insights",
    description:
      "Get personalized insights tailored to your unique mood — not just another mood journal and tracking app.",
  },
  {
    icon: MessageSquare,
    title: "Real-time guidance",
    description:
      "Get instant feedback and real-time reflections tailored to your mood.",
  },
  {
    icon: Bot,
    title: "Customize your AI avatar",
    description: "Customize your AI avatar to your unique personality.",
  },
]

export interface HowItWorksProps {
  title: string
  description: string
  imagePosition: "left" | "right"
  image: string
}

export const HOW_IT_WORKS: HowItWorksProps[] = [
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
      "Get real-time insights as your conversation becomes a smart journal entry—no writing needed, ready to review anytime.",
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
]

export interface TestimonialsProps {
  name: string
  role: string
  content: string
  avatar: string
}

export const TESTIMONIALS: TestimonialsProps[] = [
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
]

export interface FAQProbs {
  question: string
  answer: string
}

export const FAQS: FAQProbs[] = [
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
    answer: "As little as 2 minutes. Speak freely, and let the AI do the rest.",
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
      "EmotiSync AI is beneficial for anyone seeking accessible emotional health insights—whether you're dealing with daily stress, need a listening ear, or want to explore self-care routines. If you're experiencing severe mental health issues, we strongly recommend consulting a licensed therapist.",
  },
]
