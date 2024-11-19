export default function RecommendationsPage() {
  return (
    <div className="flex flex-col space-y-4 lg:space-y-6">
      <div className="space-y-1.5">
        <h1 className="font-bold text-2xl lg:text-3xl">Recommendations</h1>
        <p className="text-muted-foreground text-sm lg:text-base">
          Personalized guidance based on your conversations
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
        {/* Placeholder for recommendation cards */}
        {["Activities", "Resources", "Exercises", "Goals"].map((title) => (
          <div key={title} className="rounded-lg border p-3 lg:p-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm lg:text-base">{title}</h3>
              <p className="text-muted-foreground text-xs lg:text-sm">
                Coming soon...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
