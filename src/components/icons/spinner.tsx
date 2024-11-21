import { cn } from "@/lib/utils/client";
import { Icons } from ".";

interface SpinnerProps extends React.SVGAttributes<SVGElement> {
  className?: string;
}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Icons.spinner
      className={cn("h-4 w-4 animate-spin", className)}
      aria-hidden="true"
      {...props}
    />
  );
}
