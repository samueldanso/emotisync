"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HeroMeshGradient } from "@/components/ui/mesh-gradient"
import AppSnippet from "./snippet"

export default function HeroSection() {
  return (
    <section className="relative pt-20 md:pt-24 lg:pt-28">
      <div className="container flex max-w-[64rem] flex-col items-center text-center">
        <Badge
          className="inline-flex items-center rounded-full bg-secondary/30 px-4 py-1 font-medium text-brand-foreground text-sm ring-1 ring-brand-foreground/10 backdrop-blur"
          variant="outline"
        >
          <span className="mr-1 text-base">💛</span>
          Your personal AI companion is here
        </Badge>
        <h1 className="mt-8 font-heading font-semibold text-4xl text-brand-foreground tracking-tight sm:text-6xl md:text-7xl">
          Talk Freely, Feel Better Instantly
        </h1>
        <p className="mt-8 max-w-[42rem] text-brand-muted text-lg leading-tight sm:text-xl">
          Skip writing, just talk naturally. Your
          <span className="font-semibold text-brand-primary">
            {" "}
            AI companion
          </span>{" "}
          transforms your daily voice conversations into
          <span className="font-semibold text-brand-primary">
            {" "}
            personalized
          </span>{" "}
          insights and recommendations, helping you find clarity and growth in
          <span className="font-semibold text-brand-primary"> minutes</span>.
        </p>
        <Link
          href="https://gu9up9i3ufs.typeform.com/to/MZ5ha5dg"
          className="mt-10"
        >
          <Button className="relative rounded-full bg-gradient-to-t from-brand-primary via-brand-primary to-brand-accent/80 px-8 py-6 font-medium text-white shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-t before:from-transparent before:to-white/20 hover:scale-[1.02] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.25)] hover:before:to-white/30 active:scale-[0.98]">
            Getting started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>

        <div className="relative mt-16 w-full">
          <HeroMeshGradient />
          <AppSnippet />
        </div>
      </div>
    </section>
  )
}
