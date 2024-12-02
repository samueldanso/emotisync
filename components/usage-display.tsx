import { Clock } from "lucide-react";

interface UsageDisplayProps {
  remainingMinutes: number;
}

export function UsageDisplay({ remainingMinutes }: UsageDisplayProps) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 text-sm backdrop-blur-sm">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <span className="text-muted-foreground">
        {remainingMinutes} min remaining
      </span>
    </div>
  );
}
