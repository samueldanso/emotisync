import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "../../../../components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getUser } from "@/lib/supabase/server"

interface JournalDetailPageProps {
  params: {
    id: string
  }
}

export default async function JournalDetailPage(
  _props: JournalDetailPageProps,
) {
  const user = await getUser()
  if (!user) redirect("/login")

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 flex items-center gap-2">
        <Link href="/app/journals">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="font-semibold text-2xl">Journal Title</h1>
          <time className="text-muted-foreground text-sm">
            {new Date().toLocaleDateString()}
          </time>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="mb-2 font-medium">Summary</h2>
          <p className="text-muted-foreground">Journal summary</p>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h2 className="mb-2 font-medium">Emotional Insights</h2>
          <p className="text-muted-foreground">Dominant Emotion: Neutral</p>
        </div>
      </div>
    </div>
  )
}
