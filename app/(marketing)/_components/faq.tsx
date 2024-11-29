"use client"

import { FAQS } from "@/lib/constants"
import { Minus, Plus } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollAnimation } from "./scroll-animation"

export default function FAQSection() {
  return (
    <section id="faq" className="relative overflow-hidden">
      <div className="container space-y-12 py-12 lg:py-24">
        <ScrollAnimation>
          <div className="relative z-10 mx-auto flex max-w-[58rem] flex-col items-center px-4 text-center">
            <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text font-bold text-lg text-transparent">
              FAQ
            </span>
            <h2 className="mt-6 font-heading font-semibold text-3xl text-brand-foreground sm:text-4xl md:text-5xl">
              Frequently asked <br /> questions
            </h2>
            <p className="mt-6 max-w-[85%] font-medium text-brand-muted text-lg leading-relaxed sm:text-xl">
              Common questions about EmotiSync and AI Companion.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <Accordion
            type="single"
            collapsible
            className="relative z-10 mx-auto mt-12 max-w-3xl space-y-4"
          >
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="rounded-[22px] bg-white/50 shadow-sm ring-1 ring-black/[0.01] backdrop-blur-md transition-colors hover:bg-opacity-90 dark:bg-zinc-600/30 dark:ring-white/[0.01]"
              >
                <AccordionTrigger className="group px-6 py-4 text-left hover:no-underline">
                  <span className="font-heading font-semibold text-brand-foreground text-lg">
                    {faq.question}
                  </span>
                  <div className="relative ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Plus className="absolute h-4 w-4 text-brand-muted opacity-100 transition-opacity duration-200 group-data-[state=open]:opacity-0" />
                    <Minus className="absolute h-4 w-4 text-brand-muted opacity-0 transition-opacity duration-200 group-data-[state=open]:opacity-100" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-0 font-medium text-base text-brand-muted leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollAnimation>
      </div>
    </section>
  )
}
