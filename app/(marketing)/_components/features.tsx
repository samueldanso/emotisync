"use client"

import GlassCard from "@/components/ui/glass"
import { FeaturesGradient } from "@/app/(marketing)/_components/features-gradient"
import { FEATURES } from "@/lib/constants/marketing"
import { colorPairs } from "@/lib/constants"
import { ScrollAnimation } from "./scroll-animation"

export default function FeatureSection() {
  return (
    <section id="features" className="relative overflow-hidden">
      <div className="container space-y-12 py-12 lg:py-24">
        <FeaturesGradient />

        <ScrollAnimation>
          <div className="relative z-10 mx-auto flex max-w-[58rem] flex-col items-center px-4 text-center">
            <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text font-bold text-lg text-transparent">
              Benefits
            </span>
            <h2 className="mt-6 font-heading font-semibold text-3xl text-brand-foreground sm:text-4xl md:text-5xl">
              Simply talk about what's on your mind, receive real time insights
            </h2>
            <p className="mt-6 max-w-[85%] font-medium text-brand-muted text-lg leading-relaxed sm:text-xl">
              Moti listens, understands, and helps you reflect on your day,
              thoughts or feelings through natural conversation.
            </p>
          </div>
        </ScrollAnimation>

        <div className="relative z-10 mx-auto grid w-full max-w-[1250px] grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {FEATURES.map((feature, index) => (
            <ScrollAnimation key={feature.title}>
              <GlassCard className="hover:-translate-y-0.5 flex flex-col p-6 transition-all hover:bg-opacity-90 sm:p-8">
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-full shadow-sm"
                  style={{
                    backgroundColor: `${
                      colorPairs[index % colorPairs.length].bg
                    }30`,
                    color: colorPairs[index % colorPairs.length].icon,
                  }}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-brand-foreground text-xl md:text-[22px]">
                  {feature.title}
                </h3>
                <p className="mt-2.5 font-medium text-brand-muted leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
