import { getJournals } from "@/actions/journals"
import { getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { JournalCard } from "./_components/journal-card"

export default async function JournalsPage() {
  const user = await getUser()
  if (!user) redirect("/login")

  const { data: journals, error } = await getJournals(user.id)
  if (error) throw new Error(error)

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6">
        <h1 className="font-semibold text-2xl">Your Journal Entries</h1>
        <p className="text-muted-foreground">
          Review your past conversations and emotional insights
        </p>
      </div>

      <div className="space-y-4">
        {journals?.map((journal) => (
          <JournalCard
            key={journal.id}
            id={journal.id}
            title={journal.title}
            summary={journal.summary}
            created_at={journal.created_at}
            dominant_emotion={journal.emotional_insights.dominant_emotion}
          />
        ))}

        {journals?.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No journal entries yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
