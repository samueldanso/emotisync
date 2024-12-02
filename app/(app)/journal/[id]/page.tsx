import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getUser } from "@/lib/supabase/server";
import { db } from "@/lib/db/db";
import { journals } from "@/lib/db/schemas";
import { eq } from "drizzle-orm";

interface JournalDetailPageProps {
  params: {
    id: string;
  };
}

export default async function JournalDetailPage({
  params,
}: JournalDetailPageProps) {
  const user = await getUser();
  if (!user) redirect("/login");

  const journal = await db.query.journals.findFirst({
    where: eq(journals.id, params.id),
  });

  if (!journal || journal.userId !== user.id) {
    redirect("/journal");
  }

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="mb-6 flex items-center gap-2">
          <Link href="/journal">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-semibold text-2xl">{journal.title}</h1>
            <time className="text-muted-foreground text-sm">
              {journal.created_at?.toLocaleDateString()}
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
              Dominant Emotion: {journal.emotional_insights.dominant_emotion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
