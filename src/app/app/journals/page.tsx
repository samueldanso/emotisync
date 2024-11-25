"use client"
import { getJournals } from "@/actions/journals"
import { getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { formatDate } from "@/lib/utils"

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
          <div
            key={journal.id}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium">{journal.title}</h3>
              <time className="text-muted-foreground text-sm">
                {journal.created_at ? formatDate(journal.created_at) : ""}
              </time>
            </div>
            <p className="line-clamp-2 text-muted-foreground text-sm">
              {journal.summary}
            </p>
            <div className="mt-2 text-xs">
              Mood:{" "}
              {
                (journal.emotional_insights as { dominant_emotion: string })
                  .dominant_emotion
              }
            </div>
          </div>
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
