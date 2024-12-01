export interface UserDetails {
  id: string
  version?: number
  onboarding_completed?: boolean
  [key: string]: any
}

export interface UserAuthState {
  userDetails: UserDetails
  isUserCreated: boolean
  txDetails: any
  getUserDetails: () => Promise<void>
}

export interface CreateUserOptions {
  first_name: string
  last_name: string | null
}
