import { Answer } from './answer.d'
import { SurveyRequest } from './survey-request'

export type BodyRequest = LoginRequest | SignupRequest | ResetRequest | Answer | SurveyRequest

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
