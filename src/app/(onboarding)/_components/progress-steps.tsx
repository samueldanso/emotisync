"use client"

import { useOnboardingStore } from "@/lib/stores/onboarding"
import { Check } from "lucide-react"

const steps = [
  { id: 1, name: "Profile" },
  { id: 2, name: "Companion" },
]

export function ProgressSteps() {
  const { step } = useOnboardingStore()

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-center space-x-5">
        {steps.map((s, _i) => (
          <li key={s.id} className="relative">
            {step > s.id ? (
              <div className="flex items-center">
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <Check className="h-5 w-5 text-white" />
                </span>
                <span className="ml-2 font-medium text-sm">{s.name}</span>
              </div>
            ) : step === s.id ? (
              <div className="flex items-center">
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                <span className="ml-2 font-medium text-sm">{s.name}</span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                </span>
                <span className="ml-2 font-medium text-muted-foreground text-sm">
                  {s.name}
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
