import { cn } from "@/lib/utils"
import { Icons } from "."

interface SpinnerProps extends React.SVGAttributes<SVGElement> {
  className?: string
}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Icons.spinner
      className={cn("mr-2 size-4 animate-spin", className)}
      aria-hidden="true"
      {...props}
    />
  )
}
