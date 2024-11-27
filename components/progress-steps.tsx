"use client";

import { useOnboardingStore } from "@/stores/onboarding-store";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ONBOARDING_STEPS } from "@/lib/constants";

export function ProgressSteps() {
  const { step } = useOnboardingStore();

  return (
    <div className="flex space-x-4 lg:block lg:space-x-0 lg:space-y-4">
      {ONBOARDING_STEPS.map((s) => (
        <div key={s.id} className="flex items-center gap-3">
          {step > s.id ? (
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary">
              <Check className="h-3.5 w-3.5 text-white" />
            </div>
          ) : step === s.id ? (
            <div className="flex h-6 w-6 shrink-0 items-center justify-center">
              <div className="h-6 w-6 rounded-full border-2 border-brand-primary p-1">
                <div className="h-full w-full rounded-full bg-brand-primary" />
              </div>
            </div>
          ) : (
            <div className="h-6 w-6 shrink-0 rounded-full border-2 border-brand-muted" />
          )}
          <div className="flex flex-col">
            <span
              className={cn(
                "font-medium text-sm",
                step >= s.id ? "text-brand-foreground" : "text-brand-muted"
              )}
            >
              {s.name}
            </span>
            <span
              className={cn(
                "text-xs",
                step > s.id
                  ? "text-brand-muted"
                  : step === s.id
                  ? "text-green-500"
                  : "text-brand-muted"
              )}
            >
              {step > s.id
                ? "Completed"
                : step === s.id
                ? "In Progress"
                : "Not started"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
