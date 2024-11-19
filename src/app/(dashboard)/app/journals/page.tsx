export default function JournalsPage() {
  return (
    <div className="flex flex-col space-y-4 lg:space-y-6">
      <div className="space-y-1.5">
        <h1 className="font-bold text-2xl lg:text-3xl">Your Journals</h1>
        <p className="text-muted-foreground text-sm lg:text-base">
          View your conversation history and insights
        </p>
      </div>

      <div className="grid gap-3 lg:gap-4">
        {/* Placeholder for journal entries */}
        <div className="rounded-lg border p-3 lg:p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm lg:text-base">
                Coming soon...
              </h3>
              <time className="text-muted-foreground text-xs">Today</time>
            </div>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Your conversation history will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
