import { Card } from "./card"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-[24px]",
        "bg-white/70 backdrop-blur-[8px]",
        "dark:bg-zinc-600/30",
        "border border-white/50",
        "dark:border-white/5",
        "shadow-[0_8px_16px_rgba(147,51,234,0.03)]",
        "dark:shadow-[0_8px_16px_rgba(0,0,0,0.2)]",
        "ring-1 ring-purple-100/30",
        "dark:ring-white/10",
        className,
      )}
    >
      {children}
    </Card>
  )
}

export default GlassCard
