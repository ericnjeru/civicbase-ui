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

export interface Features {
  multipleAnswerFromSameSource?: boolean
  totalObservations?: number
  priced?: string
  qualtrics?: boolean
  randomQuestions?: boolean
  userIdentification?: boolean
}
