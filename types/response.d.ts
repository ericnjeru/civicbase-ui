import { CivicbaseUser } from './user'

export interface LoginReponse {
  user: CivicbaseUser
  token: string
}

export interface SignupResponse {
  code: string
}

export interface LogoutResponse {
  message: string
}

export interface ResetResponse {
  message: string
}
