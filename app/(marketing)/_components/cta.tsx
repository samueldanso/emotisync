"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { FeaturesGradient } from "../../../components/ui/background-gradient"

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container space-y-12 py-12 lg:py-24">
        <div className="relative z-10 mx-auto max-w-[1250px]">
          <div className="relative overflow-hidden rounded-[24px] px-4 py-32 text-center">
            <FeaturesGradient />
            <div className="relative z-10 mx-auto flex max-w-[58rem] flex-col items-center">
              <h2 className="font-heading font-semibold text-4xl text-brand-foreground sm:text-5xl md:text-6xl">
                Ready to start feeling great?
              </h2>
              <p className="mt-6 max-w-[85%] text-brand-muted text-lg leading-relaxed sm:text-xl">
                Join thousands who&apos;ve found growth through voice journaling
              </p>
              <div className="mt-8">
                <Link href="/signup">
                  <Button className="relative rounded-full bg-gradient-to-t from-brand-primary via-brand-primary to-brand-accent/80 px-8 py-6 font-medium text-lg text-white shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 ease-out before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-t before:from-transparent before:to-white/20 hover:scale-[1.02] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.25)] hover:before:to-white/30 active:scale-[0.98]">
                    Start your journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
