import { SurveyForm } from './forms.d'
import { Answer } from './answer.d'

export type BodyRequest = LoginRequest | SignupRequest | ResetRequest | SurveyForm | Answer

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
