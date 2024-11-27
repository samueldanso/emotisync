"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { AnimatePresence } from "framer-motion"

interface WelcomeButtonsProps {
  showBack?: boolean
  isLoading?: boolean
  onBack?: () => void
}

export function WelcomeButtons({
  showBack,
  isLoading,
  onBack,
}: WelcomeButtonsProps) {
  const router = useRouter()

  return (
    <div className="flex justify-center gap-4">
      <AnimatePresence mode="wait">
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
        <Button
          type="submit"
          disabled={isLoading}
          className="h-[48px] w-[140px]"
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
      </AnimatePresence>
    </div>
  )
}
