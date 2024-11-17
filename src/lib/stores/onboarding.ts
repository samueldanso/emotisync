import { create } from "zustand"
import { persist } from "zustand/middleware"

interface OnboardingState {
  step: number
  goal: string
  name: string
  companionName: string
  companionAvatar: string
  setStep: (step: number) => void
  setGoal: (goal: string) => void
  setName: (name: string) => void
  setCompanion: (name: string, avatar: string) => void
  reset: () => void
  goBack: () => void
  goNext: () => void
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      step: 1,
      goal: "",
      name: "",
      companionName: "",
      companionAvatar: "",
      setStep: (step) => set({ step }),
      setGoal: (goal) => set({ goal }),
      setName: (name) => set({ name }),
      setCompanion: (name, avatar) =>
        set({ companionName: name, companionAvatar: avatar }),
      reset: () =>
        set({
          step: 1,
          goal: "",
          name: "",
          companionName: "",
          companionAvatar: "",
        }),
      goBack: () => {
        const currentStep = get().step
        if (currentStep > 1) {
          set({ step: currentStep - 1 })
        }
      },
      goNext: () => {
        const currentStep = get().step
        if (currentStep < 2) {
          set({ step: currentStep + 1 })
        }
      },
    }),
    {
      name: "onboarding-store",
    },
  ),
)
