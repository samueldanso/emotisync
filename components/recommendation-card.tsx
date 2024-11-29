import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Music } from "lucide-react"
import type { Recommendation } from "@/lib/types/recommendation"
import Link from "next/link"

export function RecommendationCard({
  id,
  title,
  description,
  category,
  type,
  status,
  created_at,
}: Recommendation) {
  return (
    <Link href={`/recommendations/${id}`}>
      <Card className="p-4 hover:bg-accent/50">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {type === "audio" ? (
              <Music className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            )}
            <h3 className="font-medium">{title}</h3>
          </div>
          <Badge variant={status === "completed" ? "default" : "secondary"}>
            {status}
          </Badge>
        </div>
        <p className="line-clamp-2 text-muted-foreground text-sm">
          {description}
        </p>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground capitalize">{category}</span>
          <time className="text-muted-foreground">
            {created_at?.toLocaleDateString()}
          </time>
        </div>
      </Card>
    </Link>
  )
}
