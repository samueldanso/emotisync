import { Clock } from "lucide-react";

interface UsageDisplayProps {
  remainingMinutes: number;
  points: number;
}

export function UsageDisplay({ remainingMinutes, points }: UsageDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 backdrop-blur-sm">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {remainingMinutes}m
        </span>
      </div>
      <div className="rounded-full bg-background/80 px-2.5 py-1 text-sm text-muted-foreground backdrop-blur-sm">
        {points.toLocaleString()} pts
      </div>
    </div>
  );
}
