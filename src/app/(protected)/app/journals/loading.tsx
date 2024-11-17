"use client"

export default function Loading() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
      <div className="h-5 w-96 animate-pulse rounded-md bg-muted/50" />
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4 rounded-lg border p-6">
            <div className="h-5 w-32 animate-pulse rounded bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-muted/50" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
