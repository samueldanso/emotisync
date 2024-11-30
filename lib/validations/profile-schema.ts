import * as z from "zod"

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  goal: z.string().min(10, "Please tell us a bit more about your goal"),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["male", "female", "nonbinary"]).optional(),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
