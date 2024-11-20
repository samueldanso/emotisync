import * as z from "zod"

export const avatarSchema = z.object({
  avatar: z.string().min(1, "Please select an AI companion"),
  companionName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9\s]+$/,
      "Name can only contain letters, numbers and spaces",
    ),
})

export type AvatarFormValues = z.infer<typeof avatarSchema>
