import Link from "next/link"
import { Card } from "./ui/card"
import { FileText } from "lucide-react"

interface JournalCardProps {
  id: string
  title: string
  summary: string
  created_at: Date | null
  dominant_emotion: string
}

export function JournalCard({
  id,
  title,
  summary,
  created_at,
  dominant_emotion,
}: JournalCardProps) {
  return (
    <Link href={`/app/journals/${id}`}>
      <Card className="p-4 hover:bg-accent/50">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">{title}</h3>
          </div>
          <time className="text-muted-foreground text-sm">
            {created_at?.toLocaleDateString()}
          </time>
        </div>
        <p className="line-clamp-2 text-muted-foreground text-sm">{summary}</p>
        <div className="mt-2 text-xs">Mood: {dominant_emotion}</div>
      </Card>
    </Link>
  )
}
