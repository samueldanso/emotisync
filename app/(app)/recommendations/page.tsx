import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import { RecommendationList } from "@/components/recommendation-list";
import { getUserRecommendations } from "@/actions/recommendation";
import { RECOMMENDATION_CATEGORIES } from "@/lib/constants/app";

// Make page dynamic
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RecommendationsPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const { data: recommendations } = await getUserRecommendations(user.id);

  return (
    <div className="container max-w-6xl space-y-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-3xl">Recommendations</h1>
        <Tabs defaultValue="assigned">
          <TabsList>
            <TabsTrigger value="assigned">Recent</TabsTrigger>
            <TabsTrigger value="catalog">Categories</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {!recommendations?.length ? (
        <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center space-y-4 text-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-medium text-xl">No recommendations yet</h2>
          <p className="text-muted-foreground">
            Start a conversation with your AI companion to get personalized
            recommendations.
          </p>
          <Button asChild>
            <Link href="/chat">Start Session</Link>
          </Button>
        </div>
      ) : (
        <RecommendationList initialRecommendations={recommendations} />
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-4 opacity-60 md:grid-cols-2 lg:grid-cols-3">
        {RECOMMENDATION_CATEGORIES.map((Category) => (
          <div
            key={Category.label}
            className="rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50"
          >
            <Category.icon className="mb-2 h-5 w-5 text-muted-foreground" />
            <h3 className="font-medium">{Category.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
