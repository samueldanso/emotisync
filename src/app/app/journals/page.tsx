// Comment out entire file until we implement journal feature
/*
import { getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { getJournals } from "@/actions/journal"
import { JournalList } from "@/components/global/journal-list"

export default async function JournalsPage() {
  const user = await getUser()
  if (!user) redirect("/login")

  const { data: journals } = await getJournals(user.id)

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <JournalList journals={journals} />
    </div>
  )
}
*/
