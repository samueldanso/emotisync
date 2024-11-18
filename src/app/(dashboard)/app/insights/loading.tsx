"use client"

export default function Loading() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
      <div className="h-5 w-96 animate-pulse rounded-md bg-muted/50" />
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg border p-6">
            <div className="h-24 w-full animate-pulse rounded-md bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}
