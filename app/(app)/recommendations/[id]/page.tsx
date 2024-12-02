import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getUser } from "@/lib/supabase/server";
import { db } from "@/lib/db/db";
import { recommendations } from "@/lib/db/schemas/recommendations";
import { eq } from "drizzle-orm";

interface RecommendationDetailPageProps {
  params: {
    id: string;
  };
}

export default async function RecommendationDetailPage({
  params,
}: RecommendationDetailPageProps) {
  const user = await getUser();
  if (!user) redirect("/login");

  const recommendation = await db.query.recommendations.findFirst({
    where: eq(recommendations.id, params.id),
  });

  if (!recommendation || recommendation.user_id !== user.id) {
    redirect("/recommendations");
  }

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="container max-w-4xl space-y-8 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/recommendations">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="font-semibold text-3xl">{recommendation.title}</h1>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-2 font-medium">Description</h2>
              <p className="text-muted-foreground">
                {recommendation.description}
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-2 font-medium">Emotional Context</h2>
              <p className="text-muted-foreground">
                Based on: {recommendation.emotional_context.dominant_emotion}
                <br />
                Intensity:{" "}
                {Math.round(recommendation.emotional_context.intensity * 100)}%
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-2 font-medium">Details</h2>
              <div className="text-muted-foreground text-sm">
                <p>Category: {recommendation.category}</p>
                <p>Type: {recommendation.type}</p>
                <p>Status: {recommendation.status}</p>
                <p>
                  Created: {recommendation.created_at?.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
