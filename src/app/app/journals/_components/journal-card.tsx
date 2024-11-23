"use client"

import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icons"

interface JournalCardProps {
  journal: {
    id: string
    summary: string
    emotional_insights: string[]
    created_at: Date
  }
}

export function JournalCard({ journal }: JournalCardProps) {
  return (
    <Link href={`/app/journals/${journal.id}`}>
      <Card className="h-full p-6 transition-colors hover:bg-accent/50">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="line-clamp-2 text-sm">{journal.summary}</p>
            <div className="flex flex-wrap gap-2">
              {journal.emotional_insights.slice(0, 2).map((insight, index) => (
                <span
                  key={`${journal.id}-insight-${index}`}
                  className="rounded-full bg-primary/10 px-2 py-1 text-primary text-xs"
                >
                  {insight}
                </span>
              ))}
            </div>
          </div>
          <time className="text-muted-foreground text-xs">
            {formatDate(journal.created_at)}
          </time>
        </div>
        <div className="mt-4 flex items-center text-muted-foreground text-sm">
          <Icons.arrowRight className="mr-2 h-4 w-4" />
          View Details
        </div>
      </Card>
    </Link>
  )
}
