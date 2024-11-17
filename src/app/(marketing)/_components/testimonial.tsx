"use client"

import { TESTIMONIALS, type TestimonialsProps } from "@/lib/constants/marketing"
import { CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: TestimonialsProps
}) => (
  <div className="hover:-translate-y-0.5 flex w-[280px] flex-shrink-0 flex-col rounded-[24px] bg-white/50 p-6 ring-1 ring-black/[0.01] backdrop-blur-md transition-all hover:bg-opacity-90 sm:w-[360px] dark:bg-zinc-600/30 dark:ring-white/[0.01]">
    <CardContent className="p-0">
      <p className="text-brand-muted leading-relaxed">{testimonial.content}</p>
      <div className="mt-6 flex items-center">
        <Avatar className="mr-3 h-8 w-8">
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-heading font-semibold text-brand-foreground text-xl">
            {testimonial.name}
          </h4>
          <p className="text-brand-muted">{testimonial.role}</p>
        </div>
      </div>
    </CardContent>
  </div>
)

export default function TestimonialSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-slate-50 dark:bg-transparent"
    >
      <div className="container space-y-12 py-12 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-[58rem] flex-col items-center px-4 text-center">
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text font-semibold text-lg text-transparent">
            Real Stories
          </span>
          <h2 className="mt-6 font-heading font-semibold text-3xl text-brand-foreground sm:text-4xl md:text-5xl">
            What our users say
          </h2>
          <p className="mt-6 max-w-[85%] text-brand-muted text-lg leading-relaxed sm:text-xl">
            Thousands finding peace of mind through voice journaling.
          </p>
        </div>

        <div className="relative z-10 mx-auto max-w-[1250px]">
          <div className="scrollbar-hide flex justify-start gap-4 overflow-x-auto pb-4 sm:justify-center sm:gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
