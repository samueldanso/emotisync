import { getJournal } from "@/actions/journal"
import { getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface JournalDetailPageProps {
  params: {
    id: string
  }
}

export default async function JournalDetailPage({
  params,
}: JournalDetailPageProps) {
  const user = await getUser()
  if (!user) redirect("/login")

  const { data: journal, error } = await getJournal(params.id)
  if (error) throw new Error(error)
  if (!journal) redirect("/app/journals")

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 flex items-center gap-2">
        <Link href="/app/journals">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="font-semibold text-2xl">{journal.title}</h1>
          <time className="text-muted-foreground text-sm">
            {journal.created_at ? formatDate(journal.created_at) : ""}
          </time>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="mb-2 font-medium">Summary</h2>
          <p className="text-muted-foreground">{journal.summary}</p>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h2 className="mb-2 font-medium">Emotional Insights</h2>
          <p className="text-muted-foreground">
            Dominant Emotion:{" "}
            {
              (journal.emotional_insights as { dominant_emotion: string })
                .dominant_emotion
            }
          </p>
        </div>
      </div>
    </div>
  )
}
