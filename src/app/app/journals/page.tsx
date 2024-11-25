import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getJournals } from "@/actions/journal";
import { JournalList } from "@/components/global/journal-list";

export default async function JournalsPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const { data: journals, error } = await getJournals(user.id);
  if (error) throw new Error(error);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6">
        <h1 className="font-semibold text-2xl">Your Journal Entries</h1>
        <p className="text-muted-foreground">
          Review your past conversations and emotional insights
        </p>
      </div>

      <JournalList initialJournals={journals || []} />
    </div>
  );
}
