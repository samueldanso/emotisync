export default function JournalsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="font-bold text-3xl">Your Journals</h1>
      <p className="text-muted-foreground">
        View your conversation history and insights
      </p>
      {/* Placeholder for journal entries */}
      <div className="grid gap-4">
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">Coming soon...</p>
        </div>
      </div>
    </div>
  )
}
