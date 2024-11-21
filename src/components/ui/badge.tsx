import type * as React from "react"

import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils/client"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-brand-paragraph",
        gradient:
          "relative border border-purple-500/20 text-brand-heading text-sm before:absolute before:inset-[1px] before:rounded-full before:bg-purple-500/5 before:backdrop-blur-[2px] before:shadow-[inset_0_0_8px_rgba(168,85,247,0.3)] before:-z-10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
