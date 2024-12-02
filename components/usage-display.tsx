import { Clock } from "lucide-react";

interface UsageDisplayProps {
  remainingMinutes: number;
  points: number;
}

export function UsageDisplay({ remainingMinutes, points }: UsageDisplayProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <Clock className="h-4 w-4" />
        <span>{remainingMinutes}m</span>
      </div>
      <div className="flex items-center gap-1">
        <span>{points.toLocaleString()} pts</span>
      </div>
    </div>
  );
}
