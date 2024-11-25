import { create } from "zustand"
import { persist } from "zustand/middleware"

/**
 * @store OnboardingStore
 * @description Global state management for user onboarding flow using Zustand
 *
 * State Structure:
 * @property {number} step - Current onboarding step (1: Profile, 2: Companion)
 * @property {string} goal - User's primary goal/objective
 * @property {string} name - User's name
 * @property {string} companionName - Selected AI companion name
 * @property {string} companionAvatar - Selected AI companion avatar
 *
 * Actions:
 * @method setStep - Update current onboarding step
 * @method setGoal - Set user's goal
 * @method setName - Set user's name
 * @method setCompanion - Set companion preferences
 * @method reset - Reset onboarding state
 * @method goBack - Navigate to previous step
 * @method goNext - Navigate to next step
 */

interface OnboardingState {
  step: number
  goal: string
  name: string
  companionName: string
  companionAvatar: string
  setStep: (step: number) => void
  setGoal: (goal: string) => void
  setName: (name: string) => void
  setCompanion: (name: string, companion: string) => void
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
      setCompanion: (name, companion) =>
        set({ companionName: name, companionAvatar: companion }),
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
