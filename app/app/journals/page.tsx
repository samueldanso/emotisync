import { Button } from "../../../components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { BookText } from "lucide-react"
import Link from "next/link"
import { JOURNAL_CATEGORIES } from "@/lib/constants/app"

export default function JournalsPage() {
  return (
    <div className="container max-w-6xl space-y-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-3xl">Journal</h1>
        <Tabs defaultValue="assigned">
          <TabsList>
            <TabsTrigger value="assigned">Recent</TabsTrigger>
            <TabsTrigger value="catalog">Categories</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Empty State */}
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-primary/10 p-4">
          <BookText className="h-8 w-8 text-primary" />
        </div>
        <h2 className="font-medium text-xl">No journal entries yet</h2>
        <p className="text-muted-foreground">
          Your conversations will be automatically journaled here. Start talking
          with your AI companion to create your first entry.
        </p>
        <Button asChild>
          <Link href="/app/chat">Start Session</Link>
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-4 opacity-60 md:grid-cols-2 lg:grid-cols-4">
        {JOURNAL_CATEGORIES.map((Category) => (
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
