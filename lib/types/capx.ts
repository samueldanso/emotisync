export interface CapxResponse<T = any> {
  success: boolean
  result: T
  error?: string
}

export interface CapxUser {
  id: string
  version: number
  first_name: string
  last_name?: string
  telegram_id: string
  onboarding_completed: boolean
  wallet_address?: string
  [key: string]: any
}

export interface CapxAuthResult {
  user: CapxUser
  access_token: string
  refresh_token: string
  signup_tx?: any
}

export interface CapxInitData {
  auth_date: string
  hash: string
  query_id?: string
  user?: {
    id: number
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
  }
  [key: string]: any
}
