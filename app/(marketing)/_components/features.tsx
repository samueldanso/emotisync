"use client";
import GlassCard from "@/components/ui/glass";
import { FeaturesGradient } from "@/components/ui/background-gradient";
import { FEATURES } from "@/lib/constants/marketing";
import { colorPairs } from "@/lib/constants";

export default function FeatureSection() {
  return (
    <section id="features" className="relative overflow-hidden">
      <div className="container space-y-12 py-12 lg:py-24">
        <FeaturesGradient />

        <div className="relative z-10 mx-auto flex max-w-[58rem] flex-col items-center px-4 text-center">
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text font-semibold text-lg text-transparent">
            Benefits
          </span>
          <h2 className="mt-6 font-heading font-semibold text-3xl text-brand-foreground sm:text-4xl md:text-5xl">
            Simply talk about what's on your mind, receive real time insights
            instantly
          </h2>
          <p className="mt-6 max-w-[85%] text-brand-muted text-lg leading-relaxed sm:text-xl">
            EmotiSync listens, understands, and helps you journal and reflect on
            your emotions through natural conversations.
          </p>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1250px] grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            const colorPair = colorPairs[index % colorPairs.length];

            return (
              <GlassCard
                key={feature.title}
                className="hover:-translate-y-0.5 flex flex-col p-6 transition-all hover:bg-opacity-90 sm:p-8"
              >
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-full shadow-sm"
                  style={{
                    backgroundColor: `${colorPair.bg}30`,
                    color: colorPair.icon,
                  }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-brand-foreground text-xl md:text-[22px]">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-brand-muted leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
