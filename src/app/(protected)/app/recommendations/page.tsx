export default function RecommendationsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="font-bold text-3xl">Recommendations</h1>
      <p className="text-muted-foreground">
        Personalized guidance based on your conversations
      </p>
      {/* Placeholder for recommendations */}
      <div className="grid gap-4">
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}
