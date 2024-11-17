import * as z from "zod"

export const onboardingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  goal: z.string().min(10, "Please provide a more detailed goal"),
})

export type OnboardingFormValues = z.infer<typeof onboardingSchema>
