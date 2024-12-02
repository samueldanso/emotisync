import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookText } from "lucide-react";
import Link from "next/link";
import { JournalList } from "@/components/journal-list";
import { getUserJournals } from "@/actions/journal";
import { getUser } from "@/lib/supabase/server";

export default async function JournalsPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const { data: journals } = await getUserJournals(user.id);

  return (
    <div className="flex flex-col space-y-8 pt-16">
      {/* Header */}
      <div className="flex flex-col items-center gap-8">
        <h1 className="font-semibold text-3xl">Journal</h1>
        <div className="w-full max-w-[400px] px-4">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      {!journals || journals.length === 0 ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
          <div className="rounded-full bg-primary/10 p-4">
            <BookText className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-medium text-xl">No journal entries yet</h2>
          <p className="text-muted-foreground">
            Your conversations will be automatically journaled here. Start
            talking with your AI companion to create your first entry.
          </p>
          <Button asChild>
            <Link href="/chat">Start Session</Link>
          </Button>
        </div>
      ) : (
        <JournalList initialJournals={journals} />
      )}
    </div>
  );
}
