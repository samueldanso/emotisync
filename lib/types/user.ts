export interface CreateUserOptions {
  auth_provider: "google" | "telegram"
  telegram_id?: string
  first_name: string
  last_name?: string | null
}
