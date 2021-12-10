export type BodyRequest = LoginRequest | SignupRequest | ResetRequest

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  name: string
  email: string
  password: string
}

export interface ResetRequest {
  email: string
}
