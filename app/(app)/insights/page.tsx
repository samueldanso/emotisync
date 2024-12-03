import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3 } from "lucide-react"
import Link from "next/link"
import { getUser } from "@/lib/supabase/server"
import { INSIGHT_CATEGORIES } from "@/lib/constants/app"

export default async function InsightsPage() {
  const user = await getUser()
  if (!user) redirect("/login")

  return (
    <div className="flex flex-col space-y-8 pt-16">
      {/* Header */}
      <div className="flex flex-col items-center gap-8">
        <h1 className="font-semibold text-3xl">Insights</h1>
        <div className="w-full max-w-[400px] px-4">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recent">Recommended</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-primary/10 p-4">
          <BarChart3 className="h-8 w-8 text-primary" />
        </div>
        <h2 className="font-medium text-xl">No insights yet</h2>
        <p className="text-muted-foreground">
          Start a conversation with your AI companion to generate personalized
          insights about your emotional well-being.
        </p>
        <Button asChild>
          <Link href="/chat">Start Session</Link>
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-4 opacity-60 md:grid-cols-2 lg:grid-cols-4">
        {INSIGHT_CATEGORIES.map((Category) => (
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
  )
}
