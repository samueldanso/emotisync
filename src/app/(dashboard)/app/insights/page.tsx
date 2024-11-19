export default function InsightsPage() {
  return (
    <div className="flex flex-col space-y-4 lg:space-y-6">
      <div className="space-y-1.5">
        <h1 className="font-bold text-2xl lg:text-3xl">Insights</h1>
        <p className="text-muted-foreground text-sm lg:text-base">
          Track your progress and emotional patterns
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
        {/* Placeholder for insights cards */}
        {["Mood Trends", "Common Topics", "Peak Hours", "Growth Areas"].map(
          (title) => (
            <div key={title} className="rounded-lg border p-3 lg:p-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm lg:text-base">{title}</h3>
                <div className="h-24 w-full rounded bg-muted/30" />
                <p className="text-muted-foreground text-xs lg:text-sm">
                  Coming soon...
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}
