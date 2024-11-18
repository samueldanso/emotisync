"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Spinner } from "@/components/icons/spinner"

interface NavigationButtonsProps {
  showBack?: boolean
  isLoading?: boolean
  onBack?: () => void
}

export function NavigationButtons({
  showBack,
  isLoading,
  onBack,
}: NavigationButtonsProps) {
  const router = useRouter()

  return (
    <div className="flex justify-center gap-4">
      {showBack && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack || (() => router.back())}
          disabled={isLoading}
          className="h-[48px] w-[140px]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      )}
      <Button type="submit" disabled={isLoading} className="h-[48px] w-[140px]">
        {isLoading ? (
          <Spinner />
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
