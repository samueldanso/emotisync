import { Spinner } from "@/components/icons/spinner"

export default function ChatLoading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-8 w-8 text-primary/50" />
        <p className="text-muted-foreground text-sm">Loading conversation...</p>
      </div>
    </div>
  )
}
