"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HeroMeshGradient } from "@/app/(marketing)/_components/hero-gradient"
import AppSnippet from "./snippet"

export default function HeroSection() {
  return (
    <section className="relative pt-24 md:pt-28 lg:pt-32">
      <div className="container flex max-w-[64rem] flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            className="inline-flex items-center rounded-full bg-secondary/30 px-4 py-1 font-semibold text-base text-brand-foreground ring-1 ring-brand-foreground/10 backdrop-blur"
            variant="outline"
          >
            <span className="mr-1 text-base">👻</span>
            Meet Moti, your personalized AI companion
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 font-heading font-semibold text-4xl text-brand-foreground tracking-tight sm:text-6xl md:text-7xl"
        >
          Just Talk Naturally,
          <br /> Feel Better in Minutes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 mb-12 max-w-[42rem] font-semibold text-brand-muted text-lg leading-tight sm:text-xl"
        >
          Speak freely. Your friendly
          <span className="font-bold text-brand-primary"> AI companion</span>{" "}
          turns daily conversations into personalized reflections and
          mood-boosting recommendations, helping you feel better and connect
          emotionally.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/login">
            <Button className="relative rounded-full bg-gradient-to-t from-brand-primary via-brand-primary to-brand-accent/80 px-8 py-6 font-semibold text-lg text-white shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-t before:from-transparent before:to-white/20 hover:scale-[1.02] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.25)] hover:before:to-white/30 active:scale-[0.98]">
              Start talking
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>

        <div className="relative mt-16 w-full">
          <HeroMeshGradient />
          <AppSnippet />
        </div>
      </div>
    </section>
  )
}
