import { Spinner } from "@/components/icons/spinner"

export default function ChatLoading() {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner className="h-8 w-8 text-muted-foreground" />
    </div>
  )
}
