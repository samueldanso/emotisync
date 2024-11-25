"use client"

import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Document } from "lucide-react"
import type { Journal } from "@/db/schemas/journals"

interface JournalCardProps {
  journal: Journal
}

export function JournalCard({ journal }: JournalCardProps) {
  return (
    <Link href={`/app/journals/${journal.id}`}>
      <Card className="p-4 hover:bg-accent/50">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Document className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">{journal.title}</h3>
          </div>
          <time className="text-muted-foreground text-sm">
            {journal.created_at ? formatDate(journal.created_at) : ""}
          </time>
        </div>
        <p className="line-clamp-2 text-muted-foreground text-sm">
          {journal.summary}
        </p>
        <div className="mt-2 text-xs">
          Mood: {journal.emotional_insights.dominant_emotion}
        </div>
      </Card>
    </Link>
  )
}
