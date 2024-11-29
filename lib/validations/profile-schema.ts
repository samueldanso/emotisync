import * as z from "zod"

const MIN_AGE = 13
const today = new Date()
const minDate = new Date(
  today.getFullYear() - MIN_AGE,
  today.getMonth(),
  today.getDate(),
)

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  goal: z.string().min(10, "Please tell us a bit more about your goal"),
  dateOfBirth: z
    .string()
    .min(1, "Please select your date of birth")
    .refine((dob) => {
      const date = new Date(dob)
      return date <= minDate
    }, `You must be at least ${MIN_AGE} years old to create an account`),
  gender: z.enum(["male", "female", "nonbinary"]).optional(),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
