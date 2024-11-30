export interface UserDetails {
  id: string
  email: string
  telegram_id?: string
  first_name: string
  last_name?: string | null
  auth_provider: "google" | "telegram"
  onboarding_completed?: boolean
  created_at?: Date | null
  updated_at?: Date | null
}

export interface CreateUserOptions {
  auth_provider: "google" | "telegram"
  telegram_id?: string
  first_name: string
  last_name?: string | null
}
