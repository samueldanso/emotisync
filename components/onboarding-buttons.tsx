"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

interface WelcomeButtonsProps {
  showBack?: boolean
  isLoading?: boolean
  onBack?: () => void
  className?: string
}

export function WelcomeButtons({
  showBack,
  isLoading,
  onBack,
  className,
}: WelcomeButtonsProps) {
  const router = useRouter()

  return (
    <div className={cn("flex gap-4", className)}>
      {showBack && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack || (() => router.back())}
          disabled={isLoading}
          className="h-12 w-full rounded-full"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      )}
      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 w-full rounded-full bg-brand-primary hover:bg-brand-primary/90"
      >
        {isLoading ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  )
}
