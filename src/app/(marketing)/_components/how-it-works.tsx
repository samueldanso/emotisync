"use client"

import Image from "next/image"
import { HOW_IT_WORKS } from "@/lib/constants/marketing"
import { cn } from "@/lib/utils"

export default function HowItWorkSection() {
  return (
    <section id="how-it-works" className="relative overflow-hidden">
      <div className="container space-y-12 py-12 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-[58rem] flex-col items-center px-4 text-center">
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text font-semibold text-lg text-transparent">
            How it works
          </span>
          <h2 className="mt-6 font-heading font-semibold text-3xl text-brand-foreground sm:text-4xl md:text-5xl">
            Speak, sync, <br /> get clarity instantly
          </h2>
          <p className="mt-6 max-w-[85%] text-brand-muted text-lg leading-relaxed sm:text-xl">
            Turn your daily natural voice conversations into personalized
            guidance and insights.
          </p>
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1250px] gap-20 md:gap-32">
          {HOW_IT_WORKS.map((step, index) => (
            <div
              key={step.title}
              className={cn(
                "flex flex-col items-center gap-8 md:flex-row md:gap-16",
                index % 2 === 1 && "md:flex-row-reverse",
              )}
            >
              <div className="w-full space-y-4 md:w-1/2 md:pr-6">
                <h3 className="font-heading font-semibold text-2xl text-brand-foreground">
                  {step.title}
                </h3>
                <p className="text-brand-muted leading-relaxed md:text-lg">
                  {step.description}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <div className="overflow-hidden rounded-[24px] bg-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:bg-zinc-900/20 dark:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                  <Image
                    src={step.image}
                    alt={`Step ${index + 1}: ${step.title}`}
                    width={800}
                    height={600}
                    className="w-full"
                    unoptimized={step.image.endsWith(".gif")}
                    priority={index === 0}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
