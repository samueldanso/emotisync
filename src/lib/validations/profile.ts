import * as z from "zod"

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  goal: z.string().min(10, "Please provide a more detailed goal"),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
