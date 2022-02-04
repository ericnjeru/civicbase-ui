// TODO: delete
import { Setup, Language, Message, Features, Qualtrics, Conjoint } from './survey-base'

type Question = {
  id?: string
  statement: string
}
export interface SurveyRequest {
  setup: Setup
  language: Language
  message?: Message
  quadratic?: Question[]
  conjoint?: Conjoint[]
  features?: Features
  qualtrics?: Qualtrics
  id?: string
}
